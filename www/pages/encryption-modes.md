---
layout: page
title: IPCrypt Encryption Modes
description: Detailed explanations of IPCrypt's encryption modes - deterministic, non-deterministic (nd), and extended non-deterministic (ndx).
permalink: /encryption-modes/
---

# IPCrypt Encryption Modes

IPCrypt provides four distinct encryption modes, each designed for specific use cases and security requirements. This page explains each mode in detail, including their operation, properties, and appropriate use cases.

<div class="feature-list">
    <div class="feature-item">
        <div class="feature-icon">✓</div>
        <div class="feature-text"><strong>Format Preservation</strong>: Deterministic mode preserves IP address format</div>
    </div>
    <div class="feature-item">
        <div class="feature-icon">✓</div>
        <div class="feature-text"><strong>Correlation Protection</strong>: Non-deterministic modes prevent correlation attacks</div>
    </div>
    <div class="feature-item">
        <div class="feature-icon">✓</div>
        <div class="feature-text"><strong>IPv4 and IPv6 Support</strong>: All modes handle both address types uniformly</div>
    </div>
</div>

## Overview of Encryption Modes

IPCrypt offers the following encryption modes:

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon deterministic-icon">D</div>
        <div>
            <h3 class="mode-card-title">ipcrypt-deterministic</h3>
            <p class="mode-card-subtitle">Format-preserving encryption using AES-128</p>
        </div>
    </div>
    <p>The deterministic mode always produces the same output for the same input and key, preserving the IP address format.</p>
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">Format preservation</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">Consistent output</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">Searchable</div>
        </div>
    </div>
</div>

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon nd-icon">ND</div>
        <div>
            <h3 class="mode-card-title">ipcrypt-nd</h3>
            <p class="mode-card-subtitle">Non-deterministic encryption using KIASU-BC with an 8-byte tweak</p>
        </div>
    </div>
    <p>The non-deterministic mode produces different outputs for the same input and key, preventing correlation attacks.</p>
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">Correlation protection</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">8-byte tweak</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">24-byte output</div>
        </div>
    </div>
</div>

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon ndx-icon">NDX</div>
        <div>
            <h3 class="mode-card-title">ipcrypt-ndx</h3>
            <p class="mode-card-subtitle">Non-deterministic encryption using AES-XTS with a 16-byte tweak</p>
        </div>
    </div>
    <p>The extended non-deterministic mode provides maximum security with a larger tweak and output size.</p>
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">Maximum security</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">16-byte tweak</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">32-byte output</div>
        </div>
    </div>
</div>

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon pfx-icon">PFX</div>
        <div>
            <h3 class="mode-card-title">ipcrypt-pfx</h3>
            <p class="mode-card-subtitle">Prefix-preserving encryption that maintains network structure</p>
        </div>
    </div>
    <p>The prefix-preserving mode maintains network relationships in encrypted addresses, enabling network-level analytics while protecting actual network identities.</p>
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">Prefix preservation</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">Network analytics</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text">Native address sizes</div>
        </div>
    </div>
</div>

<table class="mode-comparison">
    <thead>
        <tr>
            <th>Feature</th>
            <th>Deterministic</th>
            <th>Prefix-Preserving (PFX)</th>
            <th>Non-Deterministic (ND)</th>
            <th>Extended ND (NDX)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Format Preservation</td>
            <td><span class="check">✓</span></td>
            <td><span class="check">✓</span></td>
            <td><span class="x">✗</span></td>
            <td><span class="x">✗</span></td>
        </tr>
        <tr>
            <td>Correlation Protection</td>
            <td><span class="x">✗</span></td>
            <td><span class="x">✗</span></td>
            <td><span class="check">✓</span></td>
            <td><span class="check">✓</span></td>
        </tr>
        <tr>
            <td>Output Size</td>
            <td>16 bytes</td>
            <td>4/16 bytes</td>
            <td>24 bytes</td>
            <td>32 bytes</td>
        </tr>
        <tr>
            <td>Algorithm</td>
            <td>AES-128</td>
            <td>Dual AES-128</td>
            <td>KIASU-BC</td>
            <td>AES-XTS</td>
        </tr>
        <tr>
            <td>Tweak Size</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>8 bytes</td>
            <td>16 bytes</td>
        </tr>
    </tbody>
</table>

## ipcrypt-deterministic Mode

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon deterministic-icon">D</div>
        <div>
            <h3 class="mode-card-title">How It Works</h3>
            <p class="mode-card-subtitle">Format-preserving encryption using AES-128</p>
        </div>
    </div>
    
    <p>The deterministic mode uses AES-128 as a single-block operation to encrypt IP addresses while preserving their format.</p>
    
    <div class="diagram-container">
        <pre class="encryption-diagram">
    +----------------+     +----------------+     +----------------+
    |                |     |                |     |                |
    |   IP Address   |---->|   Convert to   |---->|    AES-128     |
    | (192.168.1.1)  |     |  16-byte form  |     |   Encryption   |
    |                |     |                |     |                |
    +----------------+     +----------------+     +----------------+
                                                   |
                           +----------------+      |
                           |                |      |
                           |   16-byte Key  |------+
                           |                |
                           +----------------+
                                                   |
                                                   v
                           +----------------+     +----------------+
                           |                |     |                |
                           |   Encrypted    |<----|  Convert back  |
                           |  IP Address    |     |  to IP format  |
                           |                |     |                |
                           +----------------+     +----------------+
        </pre>
    </div>
    
    <h3>Process Flow</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">1</div>
            <div class="feature-text"><strong>Input Preparation</strong>: The IP address (IPv4 or IPv6) is converted to a standard 16-byte representation</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">2</div>
            <div class="feature-text"><strong>Encryption</strong>: The 16-byte representation is encrypted using AES-128 with the provided key</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">3</div>
            <div class="feature-text"><strong>Output Formatting</strong>: The encrypted result is converted back to an IP address format</div>
        </div>
    </div>
    
    <h3>Key Properties</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Format Preservation</strong>: The output maintains the IP address format</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Deterministic</strong>: The same input always produces the same output with a given key</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Invertible</strong>: The original IP address can be recovered with the key</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Uniform</strong>: Both IPv4 and IPv6 addresses are handled consistently</div>
        </div>
    </div>
    
    <h3>Use Cases</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">📊</div>
            <div class="feature-text"><strong>Logging</strong>: When you need to correlate log entries by IP address</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">🛡️</div>
            <div class="feature-text"><strong>Rate Limiting</strong>: When you need to count or limit requests by IP</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">🔍</div>
            <div class="feature-text"><strong>Database Indexing</strong>: When you need to query or join on encrypted IP addresses</div>
        </div>
    </div>
    
    <h3>Code Example</h3>
    
    ```python
    from ipcrypt import IPCrypt

    # Initialize with a 16-byte key
    key = bytes.fromhex("000102030405060708090a0b0c0d0e0f")
    ipcrypt = IPCrypt(key)

    # Encrypt an IPv4 address
    ip = "192.168.1.1"
    encrypted_ip = ipcrypt.encrypt_deterministic(ip)
    print(f"Original IP: {ip}")
    print(f"Encrypted IP: {encrypted_ip}")

    # Decrypt the IP address
    decrypted_ip = ipcrypt.decrypt_deterministic(encrypted_ip)
    print(f"Decrypted IP: {decrypted_ip}")
    ```
</div>

## ipcrypt-pfx Mode

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon pfx-icon">PFX</div>
        <div>
            <h3 class="mode-card-title">How It Works</h3>
            <p class="mode-card-subtitle">Prefix-preserving encryption using dual AES-128</p>
        </div>
    </div>
    
    <p>The prefix-preserving mode encrypts IP addresses while maintaining network structure. Addresses from the same network produce encrypted addresses that share a common encrypted prefix, enabling network analytics while protecting actual network identities.</p>
    
    <div class="diagram-container">
        <pre class="encryption-diagram">
    +----------------+     +----------------+     +----------------+
    |                |     |                |     |                |
    |   IP Address   |---->| Process each   |---->| For each bit:  |
    | (192.168.1.1)  |     |  bit position  |     | Compute PRF    |
    |                |     | sequentially   |     | XOR with input |
    +----------------+     +----------------+     +----------------+
                                                   |
                           +----------------+      |
                           |                |      |
                           |  32-byte Key   |------+
                           |                |
                           +----------------+
                                                   |
                                                   v
                           +----------------+     +----------------+
                           |                |     |                |
                           | Encrypted IP   |<----|  Maintains     |
                           | (Same subnet   |     |  native size   |
                           | = same prefix) |     | (4 or 16 bytes)|
                           +----------------+     +----------------+
        </pre>
    </div>
    
    <h3>Process Flow</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">1</div>
            <div class="feature-text"><strong>Key Setup</strong>: The 32-byte key is used to initialize the encryption algorithm</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">2</div>
            <div class="feature-text"><strong>Bit-by-bit Processing</strong>: Each bit of the IP address is processed sequentially from MSB to LSB</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">3</div>
            <div class="feature-text"><strong>PRF Computation</strong>: For each bit, a pseudorandom function is computed based on the prefix processed so far</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">4</div>
            <div class="feature-text"><strong>Bit Encryption</strong>: XOR the PRF's least significant bit with the current input bit</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">5</div>
            <div class="feature-text"><strong>Native Size Preservation</strong>: IPv4 addresses remain 4 bytes, IPv6 addresses remain 16 bytes</div>
        </div>
    </div>
    
    <h3>Key Properties</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Prefix Preservation</strong>: Addresses from the same network share encrypted prefixes</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Network Analytics</strong>: Enables traffic pattern analysis without revealing actual networks</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Deterministic</strong>: Same IP always produces same encrypted output with given key</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Format Preservation</strong>: Maintains native IP address sizes and formats</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Security Beyond Birthday Bound</strong>: XOR of two AES permutations provides robust security</div>
        </div>
    </div>
    
    <h3>Use Cases</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">🌐</div>
            <div class="feature-text"><strong>Network Monitoring</strong>: Detect traffic patterns from common networks without identifying them</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">🛡️</div>
            <div class="feature-text"><strong>DDoS Mitigation</strong>: Implement network-level rate limiting on encrypted addresses</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">📊</div>
            <div class="feature-text"><strong>Network Analytics</strong>: Analyze network topology without accessing raw IP addresses</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <div class="feature-text"><strong>Privacy-Preserving Monitoring</strong>: Monitor subnet traffic while protecting individual addresses</div>
        </div>
    </div>
    
    <h3>Important Considerations</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">🔑</div>
            <div class="feature-text"><strong>Key Requirement</strong>: Uses a 32-byte key for enhanced security</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">🔍</div>
            <div class="feature-text"><strong>Network Visibility</strong>: This mode intentionally reveals network structure for analytics purposes</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <div class="feature-text"><strong>Performance</strong>: Requires 64 AES operations for IPv4 and 256 for IPv6 addresses</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">💾</div>
            <div class="feature-text"><strong>Caching Optimization</strong>: Caching prefix computations improves performance for addresses in same subnet</div>
        </div>
    </div>
    
    <h3>Code Example</h3>
    
    ```python
    from ipcrypt import IPCrypt
    import os
    
    # Initialize with a 32-byte random key
    key = os.urandom(32)  # Generate a secure random 32-byte key
    ipcrypt = IPCrypt(key)
    
    # Encrypt IPv4 addresses from same subnet
    ip1 = "10.0.0.47"
    ip2 = "10.0.0.129"
    encrypted_ip1 = ipcrypt.encrypt_pfx(ip1)
    encrypted_ip2 = ipcrypt.encrypt_pfx(ip2)
    
    print(f"Original: {ip1} -> Encrypted: {encrypted_ip1}")
    print(f"Original: {ip2} -> Encrypted: {encrypted_ip2}")
    # Note: Both encrypted IPs will share the same /24 prefix
    
    # Decrypt the IP addresses
    decrypted_ip1 = ipcrypt.decrypt_pfx(encrypted_ip1)
    print(f"Decrypted: {decrypted_ip1}")
    
    # IPv6 example
    ipv6 = "2001:db8::1"
    encrypted_ipv6 = ipcrypt.encrypt_pfx(ipv6)
    print(f"IPv6: {ipv6} -> {encrypted_ipv6}")
    ```
    
    <h3>Prefix Preservation Example</h3>
    
    <p>The following example demonstrates how addresses from the same network maintain their relationship after encryption:</p>
    
    ```
    Original Network: 192.168.1.0/24
    ├── 192.168.1.10
    ├── 192.168.1.25
    └── 192.168.1.200
    
    Encrypted (with same key):
    ├── 87.234.19.147  (shares encrypted /24 prefix)
    ├── 87.234.19.201  (shares encrypted /24 prefix)
    └── 87.234.19.42   (shares encrypted /24 prefix)
    
    Note: The encrypted prefix (87.234.19.x) is cryptographically
    transformed and unrecognizable without the key, but the
    network relationship is preserved.
    ```
</div>

## ipcrypt-nd Mode

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon nd-icon">ND</div>
        <div>
            <h3 class="mode-card-title">How It Works</h3>
            <p class="mode-card-subtitle">Non-deterministic encryption using KIASU-BC with an 8-byte tweak</p>
        </div>
    </div>
    
    <p>The non-deterministic (nd) mode uses KIASU-BC, a tweakable block cipher based on AES, with an 8-byte tweak to provide non-deterministic encryption.</p>
    
    <div class="diagram-container">
        <pre class="encryption-diagram">
    +----------------+     +----------------+     +----------------+
    |                |     |                |     |                |
    |   IP Address   |---->|   Convert to   |---->|    KIASU-BC    |
    | (192.168.1.1)  |     |  16-byte form  |     |   Encryption   |
    |                |     |                |     |                |
    +----------------+     +----------------+     +----------------+
                                                   |
                           +----------------+      |
                           |                |      |
                           |   16-byte Key  |------+
                           |                |
                           +----------------+
                                                   |
                           +----------------+      |
                           |                |      |
                           |   8-byte Tweak |------+
                           |    (random)    |
                           +----------------+
                                                   |
                                                   v
                                                  +----------------+
                                                  |                |
                                                  |   Encrypted    |
                                                  |  24-byte value |
                                                  | (tweak+cipher) |
                                                  +----------------+
        </pre>
    </div>
    
    <h3>Process Flow</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">1</div>
            <div class="feature-text"><strong>Input Preparation</strong>: The IP address is converted to a 16-byte representation</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">2</div>
            <div class="feature-text"><strong>Tweak Generation</strong>: An 8-byte random tweak is generated</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">3</div>
            <div class="feature-text"><strong>Encryption</strong>: The 16-byte representation is encrypted using KIASU-BC with the key and tweak</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">4</div>
            <div class="feature-text"><strong>Output Formatting</strong>: The tweak and encrypted result are combined to form a 24-byte output</div>
        </div>
    </div>
    
    <h3>Key Properties</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Non-Deterministic</strong>: Different encryptions of the same IP address produce different outputs</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Correlation Protection</strong>: Prevents linking different encrypted versions of the same IP</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Larger Output</strong>: Produces a 24-byte output that is not in IP address format</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Tweak-Dependent</strong>: Decryption requires both the key and the original tweak</div>
        </div>
    </div>
    
    <h3>Use Cases</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">🔄</div>
            <div class="feature-text"><strong>Data Sharing</strong>: When sharing data with third parties and correlation protection is important</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">📦</div>
            <div class="feature-text"><strong>Long-term Storage</strong>: When data will be stored for extended periods</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <div class="feature-text"><strong>Privacy-Critical Applications</strong>: When maximum privacy protection is required</div>
        </div>
    </div>
    
    <h3>Code Example</h3>
    
    ```python
    from ipcrypt import IPCrypt
    import os

    # Initialize with a 16-byte key
    key = bytes.fromhex("000102030405060708090a0b0c0d0e0f")
    ipcrypt = IPCrypt(key)

    # Generate a random 8-byte tweak
    tweak = os.urandom(8)

    # Encrypt an IPv4 address
    ip = "192.168.1.1"
    encrypted_ip = ipcrypt.encrypt_nd(ip, tweak)
    print(f"Original IP: {ip}")
    print(f"Encrypted IP: {encrypted_ip}")

    # Decrypt the IP address
    decrypted_ip = ipcrypt.decrypt_nd(encrypted_ip, tweak)
    print(f"Decrypted IP: {decrypted_ip}")
    ```
</div>

## ipcrypt-ndx Mode

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon ndx-icon">NDX</div>
        <div>
            <h3 class="mode-card-title">How It Works</h3>
            <p class="mode-card-subtitle">Non-deterministic encryption using AES-XTS with a 16-byte tweak</p>
        </div>
    </div>
    
    <p>The extended non-deterministic (ndx) mode uses AES-XTS, a tweakable block cipher designed for disk encryption, with a 16-byte tweak to provide maximum security.</p>
    
    <div class="diagram-container">
        <pre class="encryption-diagram">
    +----------------+     +----------------+     +----------------+
    |                |     |                |     |                |
    |   IP Address   |---->|   Convert to   |---->|    AES-XTS     |
    | (192.168.1.1)  |     |  16-byte form  |     |   Encryption   |
    |                |     |                |     |                |
    +----------------+     +----------------+     +----------------+
                                                   |
                           +----------------+      |
                           |                |      |
                           |   16-byte Key  |------+
                           |                |
                           +----------------+
                                                   |
                           +----------------+      |
                           |                |      |
                           |  16-byte Tweak |------+
                           |    (random)    |
                           +----------------+
                                                   |
                                                   v
                                                  +----------------+
                                                  |                |
                                                  |   Encrypted    |
                                                  |  32-byte value |
                                                  | (tweak+cipher) |
                                                  +----------------+
        </pre>
    </div>
    
    <h3>Process Flow</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">1</div>
            <div class="feature-text"><strong>Input Preparation</strong>: The IP address is converted to a 16-byte representation</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">2</div>
            <div class="feature-text"><strong>Tweak Generation</strong>: A 16-byte random tweak is generated</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">3</div>
            <div class="feature-text"><strong>Encryption</strong>: The 16-byte representation is encrypted using AES-XTS with the key and tweak</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">4</div>
            <div class="feature-text"><strong>Output Formatting</strong>: The tweak and encrypted result are combined to form a 32-byte output</div>
        </div>
    </div>
    
    <h3>Key Properties</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Maximum Security</strong>: Provides the highest security margin of all modes</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Non-Deterministic</strong>: Different encryptions of the same IP address produce different outputs</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>Largest Output</strong>: Produces a 32-byte output</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✓</div>
            <div class="feature-text"><strong>128-bit Tweak Space</strong>: Uses a full 16-byte tweak for maximum randomness</div>
        </div>
    </div>
    
    <h3>Use Cases</h3>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">🔐</div>
            <div class="feature-text"><strong>Highest Security Requirements</strong>: When maximum security is needed</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">📜</div>
            <div class="feature-text"><strong>Regulatory Compliance</strong>: When strict privacy regulations must be met</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">🛡️</div>
            <div class="feature-text"><strong>Sensitive Data Protection</strong>: When protecting highly sensitive information</div>
        </div>
    </div>
    
    <h3>Code Example</h3>
    
    ```python
    from ipcrypt import IPCrypt
    import os

    # Initialize with a 16-byte key
    key = bytes.fromhex("000102030405060708090a0b0c0d0e0f")
    ipcrypt = IPCrypt(key)

    # Generate a random 16-byte tweak
    tweak = os.urandom(16)

    # Encrypt an IPv4 address
    ip = "192.168.1.1"
    encrypted_ip = ipcrypt.encrypt_ndx(ip, tweak)
    print(f"Original IP: {ip}")
    print(f"Encrypted IP: {encrypted_ip}")

    # Decrypt the IP address
    decrypted_ip = ipcrypt.decrypt_ndx(encrypted_ip, tweak)
    print(f"Decrypted IP: {decrypted_ip}")
    ```
</div>

## Choosing the Right Mode

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon deterministic-icon">?</div>
        <div>
            <h3 class="mode-card-title">Mode Selection Guide</h3>
            <p class="mode-card-subtitle">Factors to consider when choosing an encryption mode</p>
        </div>
    </div>
    
    <p>When selecting an encryption mode, consider the following factors:</p>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">1</div>
            <div class="feature-text"><strong>Format Requirements</strong>: If you need to maintain the IP address format, use deterministic or pfx mode</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">2</div>
            <div class="feature-text"><strong>Network Analytics</strong>: If you need to analyze network patterns, use pfx mode</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">3</div>
            <div class="feature-text"><strong>Correlation Protection</strong>: If preventing correlation is important, use nd or ndx mode</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">4</div>
            <div class="feature-text"><strong>Security Requirements</strong>: For maximum security, use ndx mode</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">5</div>
            <div class="feature-text"><strong>Performance Considerations</strong>: Deterministic mode is fastest, followed by nd, ndx, and pfx</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">6</div>
            <div class="feature-text"><strong>Storage Constraints</strong>: Consider the different output sizes when storage is limited</div>
        </div>
    </div>
    
    <p>For most applications, the deterministic mode provides a good balance of security and usability. When network analytics are needed, pfx mode preserves subnet relationships. When privacy concerns are paramount, the non-deterministic modes offer stronger protection against correlation attacks.</p>
    
    <h3>Mode Comparison</h3>
    
    <table class="mode-comparison">
        <thead>
            <tr>
                <th>Feature</th>
                <th>Deterministic</th>
                <th>Prefix-Preserving (PFX)</th>
                <th>Non-Deterministic (ND)</th>
                <th>Extended ND (NDX)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Underlying Algorithm</td>
                <td>AES-128</td>
                <td>Dual AES-128</td>
                <td>KIASU-BC</td>
                <td>AES-XTS</td>
            </tr>
            <tr>
                <td>Format Preservation</td>
                <td><span class="check">✓</span></td>
                <td><span class="check">✓</span></td>
                <td><span class="x">✗</span></td>
                <td><span class="x">✗</span></td>
            </tr>
            <tr>
                <td>Correlation Protection</td>
                <td><span class="x">✗</span></td>
                <td><span class="x">✗</span></td>
                <td><span class="check">✓</span></td>
                <td><span class="check">✓</span></td>
            </tr>
            <tr>
                <td>Output Size</td>
                <td>16 bytes</td>
                <td>4/16 bytes</td>
                <td>24 bytes</td>
                <td>32 bytes</td>
            </tr>
            <tr>
                <td>Tweak Size</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>8 bytes</td>
                <td>16 bytes</td>
            </tr>
            <tr>
                <td>Security Margin</td>
                <td>Standard</td>
                <td>Beyond Birthday</td>
                <td>High</td>
                <td>Highest</td>
            </tr>
            <tr>
                <td>Performance</td>
                <td>Fastest</td>
                <td>Slower (bit-by-bit)</td>
                <td>Fast</td>
                <td>Moderate</td>
            </tr>
            <tr>
                <td>Recommended Use Case</td>
                <td>Logging, Rate Limiting</td>
                <td>Network Analytics</td>
                <td>Data Sharing</td>
                <td>Highest Security Needs</td>
            </tr>
        </tbody>
    </table>
</div>


## Implementation Considerations

<div class="mode-card">
    <div class="mode-card-header">
        <div class="mode-card-icon deterministic-icon">⚙️</div>
        <div>
            <h3 class="mode-card-title">Implementation Best Practices</h3>
            <p class="mode-card-subtitle">Key considerations when implementing IPCrypt</p>
        </div>
    </div>
    
    <p>When implementing these encryption modes, keep in mind:</p>
    
    <div class="feature-list">
        <div class="feature-item">
            <div class="feature-icon">🔑</div>
            <div class="feature-text"><strong>Key Management</strong>: Securely generate and store encryption keys</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">🎲</div>
            <div class="feature-text"><strong>Tweak Generation</strong>: For nd and ndx modes, use a cryptographically secure random number generator for tweaks</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">💾</div>
            <div class="feature-text"><strong>Tweak Storage</strong>: Store tweaks alongside encrypted values for later decryption</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">⚠️</div>
            <div class="feature-text"><strong>Error Handling</strong>: Implement proper error handling for invalid inputs</div>
        </div>
        <div class="feature-item">
            <div class="feature-icon">✅</div>
            <div class="feature-text"><strong>Testing</strong>: Verify your implementation against the provided test vectors</div>
        </div>
    </div>
    
    <p>For more information on implementing these modes, see the <a href="/code-examples/">Code Examples</a> page.</p>
</div>