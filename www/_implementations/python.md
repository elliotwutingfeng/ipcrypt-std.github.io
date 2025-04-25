---
layout: implementation
title: IPCrypt Python Implementation
description: Reference implementation of IPCrypt in Python, supporting all three encryption modes.
permalink: /implementations/python/
language: Python
repository: https://github.com/jedisct1/draft-denis-ipcrypt/tree/main/implementations/python
examples:
  - title: Deterministic Encryption
    description: Encrypt an IP address using deterministic mode
    code: |
      from ipcrypt_deterministic import IPCryptDeterministic

      # Initialize with a 16-byte key
      key = bytes.fromhex("0123456789abcdeffedcba9876543210")
      ipcrypt = IPCryptDeterministic(key)

      # Encrypt an IPv4 address
      encrypted_ip = ipcrypt.encrypt("192.0.2.1")
      print(f"Encrypted IP: {encrypted_ip}")

      # Decrypt back to the original
      decrypted_ip = ipcrypt.decrypt(encrypted_ip)
      print(f"Decrypted IP: {decrypted_ip}")
  - title: Non-Deterministic Encryption (ND)
    description: Encrypt an IP address using non-deterministic mode with KIASU-BC
    code: |
      from ipcrypt_nd import IPCryptNd

      # Initialize with a 16-byte key
      key = bytes.fromhex("0123456789abcdeffedcba9876543210")
      ipcrypt = IPCryptNd(key)

      # Encrypt an IPv4 address
      encrypted_data = ipcrypt.encrypt("192.0.2.1")
      print(f"Encrypted data (hex): {encrypted_data.hex()}")

      # Decrypt back to the original
      decrypted_ip = ipcrypt.decrypt(encrypted_data)
      print(f"Decrypted IP: {decrypted_ip}")
  - title: Non-Deterministic Extended Encryption (NDX)
    description: Encrypt an IP address using non-deterministic extended mode with AES-XTS
    code: |
      from ipcrypt_ndx import IPCryptNdx

      # Initialize with a 32-byte key (two 16-byte keys)
      key = bytes.fromhex("0123456789abcdeffedcba98765432101032547698badcfeefcdab8967452301")
      ipcrypt = IPCryptNdx(key)

      # Encrypt an IPv6 address
      encrypted_data = ipcrypt.encrypt("2001:db8::1")
      print(f"Encrypted data (hex): {encrypted_data.hex()}")

      # Decrypt back to the original
      decrypted_ip = ipcrypt.decrypt(encrypted_data)
      print(f"Decrypted IP: {decrypted_ip}")
---

## IPCrypt Python Implementation

The Python implementation serves as the reference implementation for IPCrypt. It provides all three encryption modes and is designed to be clear, well-documented, and easy to understand.

## Installation

The Python implementation doesn't have any external dependencies beyond the Python standard library. You can simply copy the implementation files into your project or install them using pip:

```bash
# Not yet available on PyPI - use direct installation from GitHub
pip install git+https://github.com/jedisct1/draft-denis-ipcrypt.git#subdirectory=implementations/python
```

Alternatively, you can download the files directly:

```bash
git clone https://github.com/jedisct1/draft-denis-ipcrypt.git
cd draft-denis-ipcrypt/implementations/python
```

## Requirements

- Python 3.6 or higher
- No external dependencies

## Usage

The Python implementation provides three separate classes for the different encryption modes:

1. `IPCryptDeterministic` - Deterministic encryption using AES-128
2. `IPCryptNd` - Non-deterministic encryption using KIASU-BC
3. `IPCryptNdx` - Non-deterministic extended encryption using AES-XTS

### Deterministic Encryption

```python
from ipcrypt_deterministic import IPCryptDeterministic

# Initialize with a 16-byte key
key = bytes.fromhex("0123456789abcdeffedcba9876543210")
ipcrypt = IPCryptDeterministic(key)

# Encrypt an IP address
encrypted_ip = ipcrypt.encrypt("192.0.2.1")
print(f"Encrypted IP: {encrypted_ip}")

# Decrypt back to the original
decrypted_ip = ipcrypt.decrypt(encrypted_ip)
print(f"Decrypted IP: {decrypted_ip}")
```

### Non-Deterministic Encryption (ND)

```python
from ipcrypt_nd import IPCryptNd

# Initialize with a 16-byte key
key = bytes.fromhex("0123456789abcdeffedcba9876543210")
ipcrypt = IPCryptNd(key)

# Encrypt an IP address
encrypted_data = ipcrypt.encrypt("192.0.2.1")
print(f"Encrypted data (hex): {encrypted_data.hex()}")

# Decrypt back to the original
decrypted_ip = ipcrypt.decrypt(encrypted_data)
print(f"Decrypted IP: {decrypted_ip}")

# You can also provide a specific tweak instead of using a random one
tweak = bytes.fromhex("08e0c289bff23b7c")
encrypted_data = ipcrypt.encrypt("192.0.2.1", tweak)
```

### Non-Deterministic Extended Encryption (NDX)

```python
from ipcrypt_ndx import IPCryptNdx

# Initialize with a 32-byte key (two 16-byte keys)
key = bytes.fromhex("0123456789abcdeffedcba98765432101032547698badcfeefcdab8967452301")
ipcrypt = IPCryptNdx(key)

# Encrypt an IP address
encrypted_data = ipcrypt.encrypt("2001:db8::1")
print(f"Encrypted data (hex): {encrypted_data.hex()}")

# Decrypt back to the original
decrypted_ip = ipcrypt.decrypt(encrypted_data)
print(f"Decrypted IP: {decrypted_ip}")

# You can also provide a specific tweak instead of using a random one
tweak = bytes.fromhex("21bd1834bc088cd2b4ecbe30b70898d7")
encrypted_data = ipcrypt.encrypt("2001:db8::1", tweak)
```

## API Reference

### IPCryptDeterministic

```python
class IPCryptDeterministic:
    def __init__(self, key: bytes):
        """
        Initialize with a 16-byte key.
        
        Args:
            key: A 16-byte key as bytes
        """
        
    def encrypt(self, ip_address: str) -> str:
        """
        Encrypt an IP address using deterministic encryption.
        
        Args:
            ip_address: An IPv4 or IPv6 address as a string
            
        Returns:
            The encrypted IP address as a string
        """
        
    def decrypt(self, encrypted_ip: str) -> str:
        """
        Decrypt an encrypted IP address.
        
        Args:
            encrypted_ip: An encrypted IP address as a string
            
        Returns:
            The original IP address as a string
        """
```

### IPCryptNd

```python
class IPCryptNd:
    def __init__(self, key: bytes):
        """
        Initialize with a 16-byte key.
        
        Args:
            key: A 16-byte key as bytes
        """
        
    def encrypt(self, ip_address: str, tweak: Optional[bytes] = None) -> bytes:
        """
        Encrypt an IP address using non-deterministic encryption.
        
        Args:
            ip_address: An IPv4 or IPv6 address as a string
            tweak: An optional 8-byte tweak as bytes. If None, a random tweak is generated.
            
        Returns:
            The encrypted data as bytes (24 bytes: 8-byte tweak + 16-byte ciphertext)
        """
        
    def decrypt(self, encrypted_data: bytes) -> str:
        """
        Decrypt encrypted data.
        
        Args:
            encrypted_data: The encrypted data as bytes (24 bytes)
            
        Returns:
            The original IP address as a string
        """
```

### IPCryptNdx

```python
class IPCryptNdx:
    def __init__(self, key: bytes):
        """
        Initialize with a 32-byte key (two 16-byte keys).
        
        Args:
            key: A 32-byte key as bytes
        """
        
    def encrypt(self, ip_address: str, tweak: Optional[bytes] = None) -> bytes:
        """
        Encrypt an IP address using non-deterministic extended encryption.
        
        Args:
            ip_address: An IPv4 or IPv6 address as a string
            tweak: An optional 16-byte tweak as bytes. If None, a random tweak is generated.
            
        Returns:
            The encrypted data as bytes (32 bytes: 16-byte tweak + 16-byte ciphertext)
        """
        
    def decrypt(self, encrypted_data: bytes) -> str:
        """
        Decrypt encrypted data.
        
        Args:
            encrypted_data: The encrypted data as bytes (32 bytes)
            
        Returns:
            The original IP address as a string
        """
```

## Implementation Details

The Python implementation includes:

1. **IP Address Conversion**: Functions to convert between IP addresses and 16-byte representations
2. **AES-128 Implementation**: Pure Python implementation of AES-128 for deterministic mode
3. **KIASU-BC Implementation**: Implementation of the KIASU-BC tweakable block cipher for ND mode
4. **AES-XTS Implementation**: Implementation of AES-XTS for NDX mode

All implementations are verified against the test vectors provided in the specification.

## Performance Considerations

The Python implementation prioritizes clarity and correctness over performance. For high-performance applications, consider using the C, Rust, or Go implementations.

If you need better performance in Python, you can use the Python implementation with cryptographic libraries that provide optimized versions of AES:

```python
# Example using PyCryptodome for AES operations
from Crypto.Cipher import AES
from ipcrypt_deterministic import IPCryptDeterministic

class OptimizedIPCryptDeterministic(IPCryptDeterministic):
    def _aes_encrypt_block(self, key, block):
        cipher = AES.new(key, AES.MODE_ECB)
        return cipher.encrypt(block)
        
    def _aes_decrypt_block(self, key, block):
        cipher = AES.new(key, AES.MODE_ECB)
        return cipher.decrypt(block)
```

## Test Vectors

The Python implementation includes a script to generate and verify test vectors:

```bash
# Generate test vectors
python generate_test_vectors.py

# Verify implementation against test vectors
python verify_test_vectors.py
```

## License

The Python implementation is licensed under the ISC License.