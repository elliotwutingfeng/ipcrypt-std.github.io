/**
 * IPCrypt Browser Library
 * Complete implementation for browser use with all encryption modes
 */

(function() {
    'use strict';

    // Global namespace
    window.ipcrypt = {
        deterministic: {},
        nd: {},
        ndx: {}
    };

    // ============================
    // Utility Functions
    // ============================

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
        const bytes = new Uint8Array(BYTES_LENGTH);
        
        let doubleColonIndex = -1;
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === '') {
                if (i === 0 || i === parts.length - 1) continue;
                doubleColonIndex = i;
                break;
            }
        }

        if (doubleColonIndex >= 0) {
            const leftParts = parts.slice(0, doubleColonIndex).filter(p => p !== '');
            const rightParts = parts.slice(doubleColonIndex + 1).filter(p => p !== '');
            const missingGroups = IPV6_GROUPS - leftParts.length - rightParts.length;

            let byteIndex = 0;
            for (const part of leftParts) {
                const value = parseInt(part, 16);
                if (isNaN(value) || value < 0 || value > 0xffff) {
                    throw new Error(`Invalid IPv6 address: ${ip}`);
                }
                bytes[byteIndex++] = value >> 8;
                bytes[byteIndex++] = value & 0xff;
            }

            byteIndex = (leftParts.length + missingGroups) * 2;
            for (const part of rightParts) {
                const value = parseInt(part, 16);
                if (isNaN(value) || value < 0 || value > 0xffff) {
                    throw new Error(`Invalid IPv6 address: ${ip}`);
                }
                bytes[byteIndex++] = value >> 8;
                bytes[byteIndex++] = value & 0xff;
            }
        } else {
            const filteredParts = parts.filter(p => p !== '');
            if (filteredParts.length !== IPV6_GROUPS) {
                throw new Error(`Invalid IPv6 address (wrong number of groups): ${ip}`);
            }

            let byteIndex = 0;
            for (const part of filteredParts) {
                const value = parseInt(part, 16);
                if (isNaN(value) || value < 0 || value > 0xffff) {
                    throw new Error(`Invalid IPv6 address: ${ip}`);
                }
                bytes[byteIndex++] = value >> 8;
                bytes[byteIndex++] = value & 0xff;
            }
        }

        return bytes;
    }

    /**
     * Convert a 16-byte array to an IP address string.
     * Returns IPv4 format if the bytes represent an IPv4-mapped address.
     */
    function bytesToIp(bytes) {
        if (!(bytes instanceof Uint8Array) || bytes.length !== BYTES_LENGTH) {
            throw new Error('Bytes must be a 16-byte Uint8Array');
        }

        // Check if it's an IPv4-mapped address
        let isIpv4Mapped = true;
        for (let i = 0; i < 12; i++) {
            if (bytes[i] !== IPV4_MAPPED_PREFIX[i]) {
                isIpv4Mapped = false;
                break;
            }
        }

        if (isIpv4Mapped) {
            return `${bytes[12]}.${bytes[13]}.${bytes[14]}.${bytes[15]}`;
        }

        // Convert to IPv6
        const groups = [];
        for (let i = 0; i < BYTES_LENGTH; i += 2) {
            groups.push(((bytes[i] << 8) | bytes[i + 1]).toString(16));
        }

        // Find longest sequence of zeros for compression
        let longestZeroStart = -1;
        let longestZeroLength = 0;
        let currentZeroStart = -1;
        let currentZeroLength = 0;

        for (let i = 0; i < groups.length; i++) {
            if (groups[i] === '0') {
                if (currentZeroStart === -1) {
                    currentZeroStart = i;
                }
                currentZeroLength++;
            } else {
                if (currentZeroLength > longestZeroLength) {
                    longestZeroStart = currentZeroStart;
                    longestZeroLength = currentZeroLength;
                }
                currentZeroStart = -1;
                currentZeroLength = 0;
            }
        }

        if (currentZeroLength > longestZeroLength) {
            longestZeroStart = currentZeroStart;
            longestZeroLength = currentZeroLength;
        }

        // Build the compressed IPv6 string
        if (longestZeroLength > 1) {
            const before = groups.slice(0, longestZeroStart);
            const after = groups.slice(longestZeroStart + longestZeroLength);
            
            if (before.length === 0 && after.length === 0) {
                return '::';
            } else if (before.length === 0) {
                return '::' + after.join(':');
            } else if (after.length === 0) {
                return before.join(':') + '::';
            } else {
                return before.join(':') + '::' + after.join(':');
            }
        }

        return groups.join(':');
    }

    // ============================
    // AES Core Functions
    // ============================

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
        0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36
    ]);

    function subBytes(state, inverse = false) {
        const box = inverse ? INV_SBOX : SBOX;
        for (let i = 0; i < 16; i++) {
            state[i] = box[state[i]];
        }
    }

    function shiftRows(state, inverse = false) {
        const temp = new Uint8Array(16);
        temp.set(state);

        if (inverse) {
            // Inverse shift rows
            state[0] = temp[0]; state[1] = temp[13]; state[2] = temp[10]; state[3] = temp[7];
            state[4] = temp[4]; state[5] = temp[1]; state[6] = temp[14]; state[7] = temp[11];
            state[8] = temp[8]; state[9] = temp[5]; state[10] = temp[2]; state[11] = temp[15];
            state[12] = temp[12]; state[13] = temp[9]; state[14] = temp[6]; state[15] = temp[3];
        } else {
            // Forward shift rows
            state[0] = temp[0]; state[1] = temp[5]; state[2] = temp[10]; state[3] = temp[15];
            state[4] = temp[4]; state[5] = temp[9]; state[6] = temp[14]; state[7] = temp[3];
            state[8] = temp[8]; state[9] = temp[13]; state[10] = temp[2]; state[11] = temp[7];
            state[12] = temp[12]; state[13] = temp[1]; state[14] = temp[6]; state[15] = temp[11];
        }
    }

    function galoisMult(a, b) {
        let p = 0;
        for (let i = 0; i < 8; i++) {
            if (b & 1) p ^= a;
            const hiBitSet = a & 0x80;
            a = (a << 1) & 0xff;
            if (hiBitSet) a ^= 0x1b;
            b >>= 1;
        }
        return p;
    }

    function mixColumns(state, inverse = false) {
        const temp = new Uint8Array(16);
        temp.set(state);

        for (let i = 0; i < 4; i++) {
            const col = i * 4;
            if (inverse) {
                state[col] = galoisMult(temp[col], 0x0e) ^ galoisMult(temp[col + 1], 0x0b) ^ 
                           galoisMult(temp[col + 2], 0x0d) ^ galoisMult(temp[col + 3], 0x09);
                state[col + 1] = galoisMult(temp[col], 0x09) ^ galoisMult(temp[col + 1], 0x0e) ^ 
                               galoisMult(temp[col + 2], 0x0b) ^ galoisMult(temp[col + 3], 0x0d);
                state[col + 2] = galoisMult(temp[col], 0x0d) ^ galoisMult(temp[col + 1], 0x09) ^ 
                               galoisMult(temp[col + 2], 0x0e) ^ galoisMult(temp[col + 3], 0x0b);
                state[col + 3] = galoisMult(temp[col], 0x0b) ^ galoisMult(temp[col + 1], 0x0d) ^ 
                               galoisMult(temp[col + 2], 0x09) ^ galoisMult(temp[col + 3], 0x0e);
            } else {
                state[col] = galoisMult(temp[col], 0x02) ^ galoisMult(temp[col + 1], 0x03) ^ 
                           temp[col + 2] ^ temp[col + 3];
                state[col + 1] = temp[col] ^ galoisMult(temp[col + 1], 0x02) ^ 
                               galoisMult(temp[col + 2], 0x03) ^ temp[col + 3];
                state[col + 2] = temp[col] ^ temp[col + 1] ^ galoisMult(temp[col + 2], 0x02) ^ 
                               galoisMult(temp[col + 3], 0x03);
                state[col + 3] = galoisMult(temp[col], 0x03) ^ temp[col + 1] ^ temp[col + 2] ^ 
                               galoisMult(temp[col + 3], 0x02);
            }
        }
    }

    function expandKey(key) {
        const expandedKey = new Uint8Array(176);
        expandedKey.set(key);

        let bytesGenerated = 16;
        let rconIteration = 0;

        while (bytesGenerated < 176) {
            const temp = new Uint8Array(4);
            for (let i = 0; i < 4; i++) {
                temp[i] = expandedKey[bytesGenerated - 4 + i];
            }

            if (bytesGenerated % 16 === 0) {
                // Rotate
                const t = temp[0];
                temp[0] = temp[1];
                temp[1] = temp[2];
                temp[2] = temp[3];
                temp[3] = t;

                // SubBytes
                for (let i = 0; i < 4; i++) {
                    temp[i] = SBOX[temp[i]];
                }

                temp[0] ^= RCON[rconIteration++];
            }

            for (let i = 0; i < 4; i++) {
                expandedKey[bytesGenerated] = expandedKey[bytesGenerated - 16] ^ temp[i];
                bytesGenerated++;
            }
        }

        return expandedKey;
    }

    // ============================
    // KIASU-BC Functions
    // ============================

    function padTweak(tweak) {
        if (!(tweak instanceof Uint8Array) || tweak.length !== 8) {
            throw new Error('Tweak must be an 8-byte Uint8Array');
        }

        const padded = new Uint8Array(16);
        for (let i = 0; i < 8; i += 2) {
            padded[i * 2] = tweak[i];
            padded[i * 2 + 1] = tweak[i + 1];
        }
        return padded;
    }

    function encryptKiasuBc(key, tweak, block) {
        if (!(key instanceof Uint8Array) || key.length !== 16) {
            throw new Error('Key must be a 16-byte Uint8Array');
        }
        if (!(tweak instanceof Uint8Array) || tweak.length !== 8) {
            throw new Error('Tweak must be an 8-byte Uint8Array');
        }
        if (!(block instanceof Uint8Array) || block.length !== 16) {
            throw new Error('Block must be a 16-byte Uint8Array');
        }

        const paddedTweak = padTweak(tweak);
        const expandedKey = expandKey(key);
        const state = new Uint8Array(block);

        // Initial round
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[i] ^ paddedTweak[i];
        }

        // Main rounds
        for (let round = 1; round < 10; round++) {
            subBytes(state);
            shiftRows(state);
            mixColumns(state);
            for (let i = 0; i < 16; i++) {
                state[i] ^= expandedKey[round * 16 + i] ^ paddedTweak[i];
            }
        }

        // Final round
        subBytes(state);
        shiftRows(state);
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[160 + i] ^ paddedTweak[i];
        }

        return state;
    }

    function decryptKiasuBc(key, tweak, block) {
        if (!(key instanceof Uint8Array) || key.length !== 16) {
            throw new Error('Key must be a 16-byte Uint8Array');
        }
        if (!(tweak instanceof Uint8Array) || tweak.length !== 8) {
            throw new Error('Tweak must be an 8-byte Uint8Array');
        }
        if (!(block instanceof Uint8Array) || block.length !== 16) {
            throw new Error('Block must be a 16-byte Uint8Array');
        }

        const paddedTweak = padTweak(tweak);
        const expandedKey = expandKey(key);
        const state = new Uint8Array(block);

        // Initial round
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[160 + i] ^ paddedTweak[i];
        }
        shiftRows(state, true);
        subBytes(state, true);

        // Main rounds
        for (let round = 9; round > 0; round--) {
            for (let i = 0; i < 16; i++) {
                state[i] ^= expandedKey[round * 16 + i] ^ paddedTweak[i];
            }
            mixColumns(state, true);
            shiftRows(state, true);
            subBytes(state, true);
        }

        // Final round
        for (let i = 0; i < 16; i++) {
            state[i] ^= expandedKey[i] ^ paddedTweak[i];
        }

        return state;
    }

    // ============================
    // AES-XTS Functions
    // ============================

    function encryptBlockXts(key, tweak, plaintext) {
        if (!(key instanceof Uint8Array) || key.length !== 32) {
            throw new Error('Key must be a 32-byte Uint8Array');
        }
        if (!(tweak instanceof Uint8Array) || tweak.length !== 16) {
            throw new Error('Tweak must be a 16-byte Uint8Array');
        }
        if (!(plaintext instanceof Uint8Array) || plaintext.length !== 16) {
            throw new Error('Plaintext must be a 16-byte Uint8Array');
        }

        // Split key into K1 and K2
        const k1 = key.slice(0, 16);
        const k2 = key.slice(16);

        // Generate round keys for both K1 and K2
        const roundKeys1 = expandKey(k1);
        const roundKeys2 = expandKey(k2);

        // Encrypt tweak with K2
        const encryptedTweak = new Uint8Array(16);
        encryptedTweak.set(tweak);

        // Initial round for tweak
        for (let i = 0; i < 16; i++) {
            encryptedTweak[i] ^= roundKeys2[i];
        }

        // Main rounds for tweak
        for (let round = 1; round < 10; round++) {
            subBytes(encryptedTweak);
            shiftRows(encryptedTweak);
            mixColumns(encryptedTweak);
            for (let i = 0; i < 16; i++) {
                encryptedTweak[i] ^= roundKeys2[round * 16 + i];
            }
        }

        // Final round for tweak
        subBytes(encryptedTweak);
        shiftRows(encryptedTweak);
        for (let i = 0; i < 16; i++) {
            encryptedTweak[i] ^= roundKeys2[160 + i];
        }

        // XOR plaintext with encrypted tweak
        const state = new Uint8Array(16);
        for (let i = 0; i < 16; i++) {
            state[i] = plaintext[i] ^ encryptedTweak[i];
        }

        // Initial round
        for (let i = 0; i < 16; i++) {
            state[i] ^= roundKeys1[i];
        }

        // Main rounds
        for (let round = 1; round < 10; round++) {
            subBytes(state);
            shiftRows(state);
            mixColumns(state);
            for (let i = 0; i < 16; i++) {
                state[i] ^= roundKeys1[round * 16 + i];
            }
        }

        // Final round
        subBytes(state);
        shiftRows(state);
        for (let i = 0; i < 16; i++) {
            state[i] ^= roundKeys1[160 + i];
        }

        // XOR with encrypted tweak again
        for (let i = 0; i < 16; i++) {
            state[i] ^= encryptedTweak[i];
        }

        return state;
    }

    function decryptBlockXts(key, tweak, ciphertext) {
        if (!(key instanceof Uint8Array) || key.length !== 32) {
            throw new Error('Key must be a 32-byte Uint8Array');
        }
        if (!(tweak instanceof Uint8Array) || tweak.length !== 16) {
            throw new Error('Tweak must be a 16-byte Uint8Array');
        }
        if (!(ciphertext instanceof Uint8Array) || ciphertext.length !== 16) {
            throw new Error('Ciphertext must be a 16-byte Uint8Array');
        }

        // Split key into K1 and K2
        const k1 = key.slice(0, 16);
        const k2 = key.slice(16);

        // Generate round keys for both K1 and K2
        const roundKeys1 = expandKey(k1);
        const roundKeys2 = expandKey(k2);

        // Encrypt tweak with K2
        const encryptedTweak = new Uint8Array(16);
        encryptedTweak.set(tweak);

        // Initial round for tweak
        for (let i = 0; i < 16; i++) {
            encryptedTweak[i] ^= roundKeys2[i];
        }

        // Main rounds for tweak
        for (let round = 1; round < 10; round++) {
            subBytes(encryptedTweak);
            shiftRows(encryptedTweak);
            mixColumns(encryptedTweak);
            for (let i = 0; i < 16; i++) {
                encryptedTweak[i] ^= roundKeys2[round * 16 + i];
            }
        }

        // Final round for tweak
        subBytes(encryptedTweak);
        shiftRows(encryptedTweak);
        for (let i = 0; i < 16; i++) {
            encryptedTweak[i] ^= roundKeys2[160 + i];
        }

        // XOR ciphertext with encrypted tweak
        const state = new Uint8Array(16);
        for (let i = 0; i < 16; i++) {
            state[i] = ciphertext[i] ^ encryptedTweak[i];
        }

        // Initial round
        for (let i = 0; i < 16; i++) {
            state[i] ^= roundKeys1[160 + i];
        }
        shiftRows(state, true);
        subBytes(state, true);

        // Main rounds
        for (let round = 9; round > 0; round--) {
            for (let i = 0; i < 16; i++) {
                state[i] ^= roundKeys1[round * 16 + i];
            }
            mixColumns(state, true);
            shiftRows(state, true);
            subBytes(state, true);
        }

        // Final round
        for (let i = 0; i < 16; i++) {
            state[i] ^= roundKeys1[i];
        }

        // XOR with encrypted tweak again
        for (let i = 0; i < 16; i++) {
            state[i] ^= encryptedTweak[i];
        }

        return state;
    }

    // ============================
    // IPCrypt Deterministic Mode
    // ============================

    ipcrypt.deterministic.encrypt = function(ip, key) {
        if (!(key instanceof Uint8Array) || key.length !== 16) {
            throw new Error('Key must be a 16-byte Uint8Array');
        }

        const state = ipToBytes(ip);
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

        return bytesToIp(state);
    };

    ipcrypt.deterministic.decrypt = function(encryptedIp, key) {
        if (!(key instanceof Uint8Array) || key.length !== 16) {
            throw new Error('Key must be a 16-byte Uint8Array');
        }

        const state = ipToBytes(encryptedIp);
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

        return bytesToIp(state);
    };

    // ============================
    // IPCrypt ND Mode (KIASU-BC)
    // ============================

    ipcrypt.nd.encrypt = function(ip, key, tweak) {
        if (!(key instanceof Uint8Array) || key.length !== 16) {
            throw new Error('Key must be a 16-byte Uint8Array');
        }

        // Generate random tweak if not provided
        if (!tweak) {
            tweak = new Uint8Array(8);
            crypto.getRandomValues(tweak);
        } else if (!(tweak instanceof Uint8Array) || tweak.length !== 8) {
            throw new Error('Tweak must be an 8-byte Uint8Array');
        }

        const plaintext = ipToBytes(ip);
        const ciphertext = encryptKiasuBc(key, tweak, plaintext);

        // Combine tweak and ciphertext (24 bytes total)
        const result = new Uint8Array(24);
        result.set(tweak);
        result.set(ciphertext, 8);
        
        // Return as hex string
        return Array.from(result).map(b => b.toString(16).padStart(2, '0')).join('');
    };

    ipcrypt.nd.decrypt = function(encryptedData, key, tweak) {
        if (!(key instanceof Uint8Array) || key.length !== 16) {
            throw new Error('Key must be a 16-byte Uint8Array');
        }

        // For backward compatibility, handle both string and Uint8Array input
        let encryptedBytes;
        if (typeof encryptedData === 'string') {
            // Convert hex string to bytes
            if (encryptedData.length !== 48) {
                throw new Error('Encrypted data must be 48 hex characters (24 bytes) for nd mode');
            }
            encryptedBytes = new Uint8Array(24);
            for (let i = 0; i < 24; i++) {
                encryptedBytes[i] = parseInt(encryptedData.substr(i * 2, 2), 16);
            }
        } else if (encryptedData instanceof Uint8Array) {
            if (encryptedData.length !== 24) {
                throw new Error('Encrypted data must be a 24-byte Uint8Array');
            }
            encryptedBytes = encryptedData;
        } else {
            throw new Error('Encrypted data must be a hex string or Uint8Array');
        }

        // Extract tweak and ciphertext
        const storedTweak = encryptedBytes.slice(0, 8);
        const ciphertext = encryptedBytes.slice(8);

        // If tweak was provided, verify it matches
        if (tweak) {
            if (!(tweak instanceof Uint8Array) || tweak.length !== 8) {
                throw new Error('Tweak must be an 8-byte Uint8Array');
            }
            for (let i = 0; i < 8; i++) {
                if (storedTweak[i] !== tweak[i]) {
                    throw new Error('Tweak mismatch');
                }
            }
        }

        const plaintext = decryptKiasuBc(key, storedTweak, ciphertext);
        return bytesToIp(plaintext);
    };

    // ============================
    // IPCrypt NDX Mode (AES-XTS)
    // ============================

    ipcrypt.ndx.encrypt = function(ip, key, tweak) {
        if (!(key instanceof Uint8Array) || key.length !== 32) {
            throw new Error('Key must be a 32-byte Uint8Array for ndx mode');
        }

        // Generate random tweak if not provided
        if (!tweak) {
            tweak = new Uint8Array(16);
            crypto.getRandomValues(tweak);
        } else if (!(tweak instanceof Uint8Array) || tweak.length !== 16) {
            throw new Error('Tweak must be a 16-byte Uint8Array for ndx mode');
        }

        const plaintext = ipToBytes(ip);
        const ciphertext = encryptBlockXts(key, tweak, plaintext);

        // Concatenate tweak and ciphertext (32 bytes total)
        const output = new Uint8Array(32);
        output.set(tweak);
        output.set(ciphertext, 16);
        
        // Return as hex string
        return Array.from(output).map(b => b.toString(16).padStart(2, '0')).join('');
    };

    ipcrypt.ndx.decrypt = function(encryptedData, key, tweak) {
        if (!(key instanceof Uint8Array) || key.length !== 32) {
            throw new Error('Key must be a 32-byte Uint8Array for ndx mode');
        }

        // For backward compatibility, handle both string and Uint8Array input
        let input;
        if (typeof encryptedData === 'string') {
            // Convert hex string to bytes
            if (encryptedData.length !== 64) {
                throw new Error('Encrypted data must be 64 hex characters (32 bytes) for ndx mode');
            }
            input = new Uint8Array(32);
            for (let i = 0; i < 32; i++) {
                input[i] = parseInt(encryptedData.substr(i * 2, 2), 16);
            }
        } else if (encryptedData instanceof Uint8Array) {
            if (encryptedData.length !== 32) {
                throw new Error('Input must be a 32-byte Uint8Array');
            }
            input = encryptedData;
        } else {
            throw new Error('Encrypted data must be a hex string or Uint8Array');
        }

        const storedTweak = input.slice(0, 16);
        const ciphertext = input.slice(16);
        
        // If tweak was provided, verify it matches
        if (tweak) {
            if (!(tweak instanceof Uint8Array) || tweak.length !== 16) {
                throw new Error('Tweak must be a 16-byte Uint8Array for ndx mode');
            }
            for (let i = 0; i < 16; i++) {
                if (storedTweak[i] !== tweak[i]) {
                    throw new Error('Tweak mismatch');
                }
            }
        }
        
        const plaintext = decryptBlockXts(key, storedTweak, ciphertext);
        return bytesToIp(plaintext);
    };

})();