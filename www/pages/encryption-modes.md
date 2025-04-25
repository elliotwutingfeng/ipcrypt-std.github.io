---
layout: page
title: IPCrypt Encryption Modes
description: Detailed explanations of IPCrypt's encryption modes - deterministic, non-deterministic (nd), and extended non-deterministic (ndx).
permalink: /encryption-modes/
---

# IPCrypt Encryption Modes

IPCrypt provides three distinct encryption modes, each designed for specific use cases and security requirements. This page explains each mode in detail, including their operation, properties, and appropriate use cases.

## Overview of Encryption Modes

IPCrypt offers the following encryption modes:

1. **ipcrypt-deterministic**: Format-preserving encryption using AES-128
2. **ipcrypt-nd**: Non-deterministic encryption using KIASU-BC with an 8-byte tweak
3. **ipcrypt-ndx**: Non-deterministic encryption using AES-XTS with a 16-byte tweak

Each mode has different characteristics in terms of format preservation, correlation protection, and output size.

## ipcrypt-deterministic Mode

### How It Works

The deterministic mode uses AES-128 as a single-block operation to encrypt IP addresses while preserving their format.

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

### Process Flow

1. **Input Preparation**: The IP address (IPv4 or IPv6) is converted to a standard 16-byte representation
2. **Encryption**: The 16-byte representation is encrypted using AES-128 with the provided key
3. **Output Formatting**: The encrypted result is converted back to an IP address format

### Key Properties

- **Format Preservation**: The output maintains the IP address format
- **Deterministic**: The same input always produces the same output with a given key
- **Invertible**: The original IP address can be recovered with the key
- **Uniform**: Both IPv4 and IPv6 addresses are handled consistently

### Use Cases

- **Logging**: When you need to correlate log entries by IP address
- **Rate Limiting**: When you need to count or limit requests by IP
- **Database Indexing**: When you need to query or join on encrypted IP addresses

### Code Example

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

## ipcrypt-nd Mode

### How It Works

The non-deterministic (nd) mode uses KIASU-BC, a tweakable block cipher based on AES, with an 8-byte tweak to provide non-deterministic encryption.

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

### Process Flow

1. **Input Preparation**: The IP address is converted to a 16-byte representation
2. **Tweak Generation**: An 8-byte random tweak is generated
3. **Encryption**: The 16-byte representation is encrypted using KIASU-BC with the key and tweak
4. **Output Formatting**: The tweak and encrypted result are combined to form a 24-byte output

### Key Properties

- **Non-Deterministic**: Different encryptions of the same IP address produce different outputs
- **Correlation Protection**: Prevents linking different encrypted versions of the same IP
- **Larger Output**: Produces a 24-byte output that is not in IP address format
- **Tweak-Dependent**: Decryption requires both the key and the original tweak

### Use Cases

- **Data Sharing**: When sharing data with third parties and correlation protection is important
- **Long-term Storage**: When data will be stored for extended periods
- **Privacy-Critical Applications**: When maximum privacy protection is required

### Code Example

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

## ipcrypt-ndx Mode

### How It Works

The extended non-deterministic (ndx) mode uses AES-XTS, a tweakable block cipher designed for disk encryption, with a 16-byte tweak to provide maximum security.

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

### Process Flow

1. **Input Preparation**: The IP address is converted to a 16-byte representation
2. **Tweak Generation**: A 16-byte random tweak is generated
3. **Encryption**: The 16-byte representation is encrypted using AES-XTS with the key and tweak
4. **Output Formatting**: The tweak and encrypted result are combined to form a 32-byte output

### Key Properties

- **Maximum Security**: Provides the highest security margin of all modes
- **Non-Deterministic**: Different encryptions of the same IP address produce different outputs
- **Largest Output**: Produces a 32-byte output
- **128-bit Tweak Space**: Uses a full 16-byte tweak for maximum randomness

### Use Cases

- **Highest Security Requirements**: When maximum security is needed
- **Regulatory Compliance**: When strict privacy regulations must be met
- **Sensitive Data Protection**: When protecting highly sensitive information

### Code Example

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

## Comparison of Encryption Modes

| Feature                | ipcrypt-deterministic  | ipcrypt-nd   | ipcrypt-ndx            |
| ---------------------- | ---------------------- | ------------ | ---------------------- |
| Underlying Algorithm   | AES-128                | KIASU-BC     | AES-XTS                |
| Format Preservation    | Yes                    | No           | No                     |
| Correlation Protection | No                     | Yes          | Yes                    |
| Output Size            | 16 bytes               | 24 bytes     | 32 bytes               |
| Tweak Size             | N/A                    | 8 bytes      | 16 bytes               |
| Security Margin        | Standard               | High         | Highest                |
| Performance            | Fastest                | Fast         | Moderate               |
| Recommended Use Case   | Logging, Rate Limiting | Data Sharing | Highest Security Needs |

## Choosing the Right Mode

When selecting an encryption mode, consider the following factors:

1. **Format Requirements**: If you need to maintain the IP address format, use deterministic mode
2. **Correlation Protection**: If preventing correlation is important, use nd or ndx mode
3. **Security Requirements**: For maximum security, use ndx mode
4. **Performance Considerations**: Deterministic mode is fastest, followed by nd and ndx
5. **Storage Constraints**: Consider the different output sizes when storage is limited

For most applications, the deterministic mode provides a good balance of security and usability. However, when privacy concerns are paramount, the non-deterministic modes offer stronger protection against correlation attacks.

## Implementation Considerations

When implementing these encryption modes, keep in mind:

1. **Key Management**: Securely generate and store encryption keys
2. **Tweak Generation**: For nd and ndx modes, use a cryptographically secure random number generator for tweaks
3. **Tweak Storage**: Store tweaks alongside encrypted values for later decryption
4. **Error Handling**: Implement proper error handling for invalid inputs
5. **Testing**: Verify your implementation against the provided test vectors

For more information on implementing these modes, see the [Code Examples](/code-examples/) page.