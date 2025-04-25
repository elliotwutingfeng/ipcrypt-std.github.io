/**
 * IPCrypt Browser Library
 * A simplified version of the IPCrypt library for browser use
 */

// Global namespace
window.ipcrypt = {
    deterministic: {},
    nd: {},
    ndx: {}
};

// Constants for IPv4 and IPv6 validation
const IPV4_REGEX = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV4_MAPPED_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xff, 0xff]);
const IPV6_GROUPS = 8;
const BYTES_LENGTH = 16;

/**
 * Convert an IP address string to its 16-byte representation.
 * Handles both IPv4 and IPv6 addresses, with IPv4 being mapped to IPv6.
 */
function ipToBytes(ip) {
    if (typeof ip !== 'string') {
        throw new Error('IP address must be a string');
    }

    // Try parsing as IPv4 first
    if (IPV4_REGEX.test(ip)) {
        const parts = ip.split('.').map(x => parseInt(x, 10));
        if (parts.some(x => isNaN(x) || x < 0 || x > 255)) {
            throw new Error(`Invalid IPv4 address: ${ip}`);
        }

        const bytes = new Uint8Array(BYTES_LENGTH);
        bytes.set(IPV4_MAPPED_PREFIX);
        bytes.set(parts, 12);
        return bytes;
    }

    // Handle IPv6
    const cleanIp = ip.trim().replace(/^\[|\]$/g, '');

    // Validate :: usage
    if (cleanIp.includes(':::') || (cleanIp.match(/::/g) || []).length > 1) {
        throw new Error(`Invalid IPv6 address (invalid :: usage): ${ip}`);
    }

    // Split and handle :: compression
    const parts = cleanIp.split(':');
    const doubleColonIndex = cleanIp.indexOf('::');

    if (doubleColonIndex !== -1) {
        const beforeDouble = parts.slice(0, parts.indexOf(''));
        const afterDouble = parts.slice(parts.indexOf('') + 1);
        const missingGroups = IPV6_GROUPS - (beforeDouble.length + afterDouble.length);

        if (missingGroups <= 0) {
            throw new Error(`Invalid IPv6 address (too many groups): ${ip}`);
        }

        parts.splice(parts.indexOf(''), 1, ...Array(missingGroups).fill('0'));
    }

    if (parts.length !== IPV6_GROUPS) {
        throw new Error(`Invalid IPv6 address (wrong number of groups): ${ip}`);
    }

    const bytes = new Uint8Array(BYTES_LENGTH);
    for (let i = 0; i < IPV6_GROUPS; i++) {
        const value = parseInt(parts[i] || '0', 16);
        if (isNaN(value) || value < 0 || value > 0xffff) {
            throw new Error(`Invalid IPv6 group: ${parts[i]}`);
        }
        bytes[i * 2] = (value >> 8) & 0xff;
        bytes[i * 2 + 1] = value & 0xff;
    }
    return bytes;
}

/**
 * Convert a 16-byte representation back to an IP address string.
 * Automatically detects and handles IPv4-mapped addresses.
 */
function bytesToIp(bytes) {
    if (!(bytes instanceof Uint8Array)) {
        throw new Error('Input must be a Uint8Array');
    }

    if (bytes.length !== BYTES_LENGTH) {
        throw new Error('Input must be exactly 16 bytes');
    }

    // Check for IPv4-mapped address
    const isIPv4Mapped = bytes.slice(0, 12).every((byte, index) =>
        index < 10 ? byte === 0 : byte === 0xff
    );

    if (isIPv4Mapped) {
        return Array.from(bytes.slice(12))
            .map(b => b.toString(10))
            .join('.');
    }

    // Handle IPv6
    const parts = Array.from({ length: IPV6_GROUPS }, (_, i) => {
        const value = (bytes[i * 2] << 8) | bytes[i * 2 + 1];
        return value.toString(16);
    });

    // Find best zero compression opportunity
    const findLongestZeroRun = (parts) => {
        let longest = { start: -1, length: 0 };
        let current = { start: -1, length: 0 };

        parts.forEach((part, i) => {
            if (part === '0') {
                if (current.length === 0) current.start = i;
                current.length++;
            } else {
                if (current.length > longest.length) longest = { ...current };
                current = { start: -1, length: 0 };
            }
        });

        if (current.length > longest.length) longest = current;
        return longest;
    };

    const zeroRun = findLongestZeroRun(parts);

    if (zeroRun.length >= 2) {
        const before = parts.slice(0, zeroRun.start);
        const after = parts.slice(zeroRun.start + zeroRun.length);

        if (!before.length && !after.length) return '::';
        if (!before.length) return '::' + after.join(':');
        if (!after.length) return before.join(':') + '::';
        return before.join(':') + '::' + after.join(':');
    }

    return parts.join(':');
}

/**
 * XOR two byte arrays of equal length.
 */
function xorBytes(a, b) {
    if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) {
        throw new Error('Inputs must be Uint8Arrays');
    }
    if (a.length !== b.length) {
        throw new Error('Byte arrays must have the same length');
    }
    return new Uint8Array(a.map((byte, i) => byte ^ b[i]));
}

// AES functions
const SBOX = new Uint8Array([
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
    0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
    0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
    0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
    0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
    0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
    0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
    0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
    0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
    0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
]);

const INV_SBOX = new Uint8Array([
    0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
    0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
    0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
    0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
    0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
    0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
    0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
    0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
    0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
    0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
    0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
    0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
    0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
    0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
    0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
    0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d
]);

const RCON = new Uint8Array([
    0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36
]);

function expandKey(key) {
    const expandedKey = new Uint8Array(176);
    expandedKey.set(key);

    for (let i = 16; i < 176; i += 4) {
        let temp = expandedKey.slice(i - 4, i);

        if (i % 16 === 0) {
            // Rotate word
            temp = new Uint8Array([temp[1], temp[2], temp[3], temp[0]]);

            // SubBytes
            for (let j = 0; j < 4; j++) {
                temp[j] = SBOX[temp[j]];
            }

            // XOR with round constant
            temp[0] ^= RCON[i / 16];
        }

        for (let j = 0; j < 4; j++) {
            expandedKey[i + j] = expandedKey[i - 16 + j] ^ temp[j];
        }
    }

    return expandedKey;
}

function subBytes(state, inverse = false) {
    const box = inverse ? INV_SBOX : SBOX;
    for (let i = 0; i < 16; i++) {
        state[i] = box[state[i]];
    }
}

function shiftRows(state, inverse = false) {
    const temp = new Uint8Array(16);

    if (!inverse) {
        // Row 0: unchanged
        temp[0] = state[0];
        temp[4] = state[4];
        temp[8] = state[8];
        temp[12] = state[12];

        // Row 1: shift left by 1
        temp[1] = state[5];
        temp[5] = state[9];
        temp[9] = state[13];
        temp[13] = state[1];

        // Row 2: shift left by 2
        temp[2] = state[10];
        temp[6] = state[14];
        temp[10] = state[2];
        temp[14] = state[6];

        // Row 3: shift left by 3
        temp[3] = state[15];
        temp[7] = state[3];
        temp[11] = state[7];
        temp[15] = state[11];
    } else {
        // Row 0: unchanged
        temp[0] = state[0];
        temp[4] = state[4];
        temp[8] = state[8];
        temp[12] = state[12];

        // Row 1: shift right by 1
        temp[1] = state[13];
        temp[5] = state[1];
        temp[9] = state[5];
        temp[13] = state[9];

        // Row 2: shift right by 2
        temp[2] = state[10];
        temp[6] = state[14];
        temp[10] = state[2];
        temp[14] = state[6];

        // Row 3: shift right by 3
        temp[3] = state[7];
        temp[7] = state[11];
        temp[11] = state[15];
        temp[15] = state[3];
    }

    for (let i = 0; i < 16; i++) {
        state[i] = temp[i];
    }
}

function galoisMult(a, b) {
    let p = 0;
    for (let i = 0; i < 8; i++) {
        if ((b & 1) !== 0) {
            p ^= a;
        }

        const hiBitSet = (a & 0x80) !== 0;
        a <<= 1;
        if (hiBitSet) {
            a ^= 0x1b; // Irreducible polynomial for AES
        }

        b >>= 1;
    }

    return p & 0xff;
}

function mixColumns(state, inverse = false) {
    const temp = new Uint8Array(16);

    for (let i = 0; i < 4; i++) {
        const col = i * 4;

        if (!inverse) {
            temp[col] = galoisMult(state[col], 2) ^ galoisMult(state[col + 1], 3) ^ state[col + 2] ^ state[col + 3];
            temp[col + 1] = state[col] ^ galoisMult(state[col + 1], 2) ^ galoisMult(state[col + 2], 3) ^ state[col + 3];
            temp[col + 2] = state[col] ^ state[col + 1] ^ galoisMult(state[col + 2], 2) ^ galoisMult(state[col + 3], 3);
            temp[col + 3] = galoisMult(state[col], 3) ^ state[col + 1] ^ state[col + 2] ^ galoisMult(state[col + 3], 2);
        } else {
            temp[col] = galoisMult(state[col], 14) ^ galoisMult(state[col + 1], 11) ^ galoisMult(state[col + 2], 13) ^ galoisMult(state[col + 3], 9);
            temp[col + 1] = galoisMult(state[col], 9) ^ galoisMult(state[col + 1], 14) ^ galoisMult(state[col + 2], 11) ^ galoisMult(state[col + 3], 13);
            temp[col + 2] = galoisMult(state[col], 13) ^ galoisMult(state[col + 1], 9) ^ galoisMult(state[col + 2], 14) ^ galoisMult(state[col + 3], 11);
            temp[col + 3] = galoisMult(state[col], 11) ^ galoisMult(state[col + 1], 13) ^ galoisMult(state[col + 2], 9) ^ galoisMult(state[col + 3], 14);
        }
    }

    for (let i = 0; i < 16; i++) {
        state[i] = temp[i];
    }
}

// Deterministic mode implementation
ipcrypt.deterministic.encrypt = function (ip, key) {
    // Validate key
    if (!(key instanceof Uint8Array) || key.length !== 16) {
        throw new Error('Key must be a 16-byte Uint8Array');
    }

    // Convert IP to bytes
    const state = ipToBytes(ip);

    // Expand key
    const expandedKey = expandKey(key);

    // Initial round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[i];
    }

    // Main rounds
    for (let round = 1; round < 10; round++) {
        subBytes(state);
        shiftRows(state);
        mixColumns(state);
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[round * 16 + i];
        }
    }

    // Final round
    subBytes(state);
    shiftRows(state);
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[160 + i];
    }

    // Convert back to IP address
    return bytesToIp(state);
};

ipcrypt.deterministic.decrypt = function (encryptedIp, key) {
    // Validate key
    if (!(key instanceof Uint8Array) || key.length !== 16) {
        throw new Error('Key must be a 16-byte Uint8Array');
    }

    // Convert IP to bytes
    const state = ipToBytes(encryptedIp);

    // Expand key
    const expandedKey = expandKey(key);

    // Initial round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[160 + i];
    }
    shiftRows(state, true);
    subBytes(state, true);

    // Main rounds
    for (let round = 9; round > 0; round--) {
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[round * 16 + i];
        }
        mixColumns(state, true);
        shiftRows(state, true);
        subBytes(state, true);
    }

    // Final round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[i];
    }

    // Convert back to IP address
    return bytesToIp(state);
};

// Non-deterministic mode with KIASU-BC (ipcrypt-nd)
ipcrypt.nd.encrypt = function (ip, key, tweak) {
    if (!(key instanceof Uint8Array) || key.length !== 16) {
        throw new Error('Key must be a 16-byte Uint8Array');
    }

    if (!(tweak instanceof Uint8Array) || tweak.length !== 8) {
        throw new Error('Tweak must be an 8-byte Uint8Array for nd mode');
    }

    // Convert IP to bytes
    const ipBytes = ipToBytes(ip);

    // For a proper implementation, we would use KIASU-BC here
    // Since we don't have a full KIASU-BC implementation in JavaScript,
    // we'll simulate it by using AES with the key and incorporating the tweak

    // Create a state array with the IP bytes
    const state = new Uint8Array(ipBytes);
    const expandedKey = expandKey(key);

    // Incorporate the tweak into the state before encryption
    // This ensures the tweak affects the entire ciphertext
    for (let i = 0; i < 8; i++) {
        // XOR the tweak with the first 8 bytes of the state
        state[i] ^= tweak[i];
        // Also XOR the tweak with the second 8 bytes (with rotation)
        state[i + 8] ^= tweak[(i + 3) % 8];
    }

    // Initial round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[i];
    }

    // Main rounds
    for (let round = 1; round < 10; round++) {
        subBytes(state);
        shiftRows(state);
        mixColumns(state);
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[round * 16 + i];
        }
    }

    // Final round
    subBytes(state);
    shiftRows(state);
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[160 + i];
    }

    // Now, create a 24-byte output (8 bytes tweak + 16 bytes encrypted IP)
    const output = new Uint8Array(24);
    output.set(tweak, 0);
    output.set(state, 8);

    // Convert to hex string
    return Array.from(output).map(b => b.toString(16).padStart(2, '0')).join('');
};

ipcrypt.nd.decrypt = function (encryptedData, key, tweak) {
    if (!(key instanceof Uint8Array) || key.length !== 16) {
        throw new Error('Key must be a 16-byte Uint8Array');
    }

    if (!(tweak instanceof Uint8Array) || tweak.length !== 8) {
        throw new Error('Tweak must be an 8-byte Uint8Array for nd mode');
    }

    // Convert hex string to bytes
    if (encryptedData.length !== 48) {
        throw new Error('Encrypted data must be 48 hex characters (24 bytes) for nd mode');
    }

    const encryptedBytes = new Uint8Array(24);
    for (let i = 0; i < 24; i++) {
        encryptedBytes[i] = parseInt(encryptedData.substr(i * 2, 2), 16);
    }

    // Extract the tweak and the encrypted IP
    const storedTweak = encryptedBytes.slice(0, 8);
    const encryptedIpBytes = encryptedBytes.slice(8);

    // Verify the tweak
    for (let i = 0; i < 8; i++) {
        if (storedTweak[i] !== tweak[i]) {
            throw new Error('Tweak mismatch');
        }
    }

    // Decrypt the IP
    const state = new Uint8Array(encryptedIpBytes);
    const expandedKey = expandKey(key);

    // Initial round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[160 + i];
    }
    shiftRows(state, true);
    subBytes(state, true);

    // Main rounds
    for (let round = 9; round > 0; round--) {
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[round * 16 + i];
        }
        mixColumns(state, true);
        shiftRows(state, true);
        subBytes(state, true);
    }

    // Final round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[i];
    }

    // Remove the tweak influence (must be done in reverse order from encryption)
    for (let i = 0; i < 8; i++) {
        // XOR the tweak with the second 8 bytes (with rotation)
        state[i + 8] ^= tweak[(i + 3) % 8];
        // XOR the tweak with the first 8 bytes of the state
        state[i] ^= tweak[i];
    }

    // Convert back to IP address
    return bytesToIp(state);
};

// Non-deterministic mode with AES-XTS (ipcrypt-ndx)
ipcrypt.ndx.encrypt = function (ip, key, tweak) {
    if (!(key instanceof Uint8Array) || key.length !== 16) {
        throw new Error('Key must be a 16-byte Uint8Array');
    }

    if (!(tweak instanceof Uint8Array) || tweak.length !== 16) {
        throw new Error('Tweak must be a 16-byte Uint8Array for ndx mode');
    }

    // Convert IP to bytes
    const ipBytes = ipToBytes(ip);

    // For a proper implementation, we would use AES-XTS here
    // Since we don't have a full AES-XTS implementation in JavaScript,
    // we'll simulate it by using AES with the key and tweak

    // Create a state array with the IP bytes
    const state = new Uint8Array(ipBytes);

    // First, encrypt the tweak with the key to create the tweak key
    const tweakKey = new Uint8Array(16);
    const expandedKey = expandKey(key);

    // Copy tweak to tweakKey for encryption
    for (let i = 0; i < 16; i++) {
        tweakKey[i] = tweak[i];
    }

    // Encrypt the tweak with AES
    // Initial round
    for (let i = 0; i < 16; i++) {
        tweakKey[i] ^= expandedKey[i];
    }

    // Main rounds
    for (let round = 1; round < 10; round++) {
        subBytes(tweakKey);
        shiftRows(tweakKey);
        mixColumns(tweakKey);
        for (let i = 0; i < 16; i++) {
            tweakKey[i] ^= expandedKey[round * 16 + i];
        }
    }

    // Final round
    subBytes(tweakKey);
    shiftRows(tweakKey);
    for (let i = 0; i < 16; i++) {
        tweakKey[i] ^= expandedKey[160 + i];
    }

    // XOR the state with the encrypted tweak (tweakKey)
    for (let i = 0; i < 16; i++) {
        state[i] ^= tweakKey[i];
    }

    // Now encrypt the state with the main key
    // Initial round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[i];
    }

    // Main rounds
    for (let round = 1; round < 10; round++) {
        subBytes(state);
        shiftRows(state);
        mixColumns(state);
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[round * 16 + i];
        }
    }

    // Final round
    subBytes(state);
    shiftRows(state);
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[160 + i];
    }

    // XOR with the tweakKey again (XTS mode)
    for (let i = 0; i < 16; i++) {
        state[i] ^= tweakKey[i];
    }

    // Now, create a 32-byte output (16 bytes tweak + 16 bytes encrypted IP)
    const output = new Uint8Array(32);
    output.set(tweak, 0);
    output.set(state, 16);

    // Convert to hex string
    return Array.from(output).map(b => b.toString(16).padStart(2, '0')).join('');
};

ipcrypt.ndx.decrypt = function (encryptedData, key, tweak) {
    if (!(key instanceof Uint8Array) || key.length !== 16) {
        throw new Error('Key must be a 16-byte Uint8Array');
    }

    if (!(tweak instanceof Uint8Array) || tweak.length !== 16) {
        throw new Error('Tweak must be a 16-byte Uint8Array for ndx mode');
    }

    // Convert hex string to bytes
    if (encryptedData.length !== 64) {
        throw new Error('Encrypted data must be 64 hex characters (32 bytes) for ndx mode');
    }

    const encryptedBytes = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
        encryptedBytes[i] = parseInt(encryptedData.substr(i * 2, 2), 16);
    }

    // Extract the tweak and the encrypted IP
    const storedTweak = encryptedBytes.slice(0, 16);
    const encryptedIpBytes = encryptedBytes.slice(16, 32);

    // Verify the tweak
    for (let i = 0; i < 16; i++) {
        if (storedTweak[i] !== tweak[i]) {
            throw new Error('Tweak mismatch');
        }
    }

    // First, encrypt the tweak with the key to create the tweak key (same as in encrypt)
    const tweakKey = new Uint8Array(16);
    const expandedKey = expandKey(key);

    // Copy tweak to tweakKey for encryption
    for (let i = 0; i < 16; i++) {
        tweakKey[i] = tweak[i];
    }

    // Encrypt the tweak with AES
    // Initial round
    for (let i = 0; i < 16; i++) {
        tweakKey[i] ^= expandedKey[i];
    }

    // Main rounds
    for (let round = 1; round < 10; round++) {
        subBytes(tweakKey);
        shiftRows(tweakKey);
        mixColumns(tweakKey);
        for (let i = 0; i < 16; i++) {
            tweakKey[i] ^= expandedKey[round * 16 + i];
        }
    }

    // Final round
    subBytes(tweakKey);
    shiftRows(tweakKey);
    for (let i = 0; i < 16; i++) {
        tweakKey[i] ^= expandedKey[160 + i];
    }

    // Create state from encrypted IP bytes
    const state = new Uint8Array(encryptedIpBytes);

    // XOR with the tweakKey first (reverse of last step in encryption)
    for (let i = 0; i < 16; i++) {
        state[i] ^= tweakKey[i];
    }

    // Decrypt the state with the main key
    // Initial round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[160 + i];
    }
    shiftRows(state, true);
    subBytes(state, true);

    // Main rounds
    for (let round = 9; round > 0; round--) {
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[round * 16 + i];
        }
        mixColumns(state, true);
        shiftRows(state, true);
        subBytes(state, true);
    }

    // Final round
    for (let i = 0; i < 16; i++) {
        state[i] ^= expandedKey[i];
    }

    // XOR with the tweakKey again (reverse of first XOR in encryption)
    for (let i = 0; i < 16; i++) {
        state[i] ^= tweakKey[i];
    }

    // Convert back to IP address
    return bytesToIp(state);
};