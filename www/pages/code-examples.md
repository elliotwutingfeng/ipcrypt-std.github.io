---
layout: page
title: IPCrypt Code Examples
description: Code examples showing how to use IPCrypt in different programming languages.
permalink: /code-examples/
---

# IPCrypt Code Examples

This page provides code examples for using IPCrypt in various programming languages. These examples demonstrate how to encrypt and decrypt IP addresses using the different modes provided by IPCrypt.

## Python Implementation

### Deterministic Mode

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

### Non-Deterministic Mode

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

## JavaScript Implementation

### Deterministic Mode

```javascript
// Import the ipcrypt library
const ipcrypt = require('ipcrypt');

// Convert hex string to Uint8Array
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

// Initialize with a 16-byte key
const key = hexToBytes("000102030405060708090a0b0c0d0e0f");

// Encrypt an IPv4 address
const ip = "192.168.1.1";
const encryptedIp = ipcrypt.deterministic.encrypt(ip, key);
console.log(`Original IP: ${ip}`);
console.log(`Encrypted IP: ${encryptedIp}`);

// Decrypt the IP address
const decryptedIp = ipcrypt.deterministic.decrypt(encryptedIp, key);
console.log(`Decrypted IP: ${decryptedIp}`);
```

## C Implementation

### Deterministic Mode

```c
#include <stdio.h>
#include <string.h>
#include "ipcrypt.h"

int main() {
    // Initialize with a 16-byte key
    uint8_t key[16] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 
                       0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f};
    
    // Original IP address
    char ip_str[16] = "192.168.1.1";
    uint32_t ip;
    inet_pton(AF_INET, ip_str, &ip);
    
    // Encrypt the IP address
    uint32_t encrypted_ip = ipcrypt_encrypt(ip, key);
    
    // Convert to string for display
    char encrypted_ip_str[16];
    struct in_addr addr;
    addr.s_addr = encrypted_ip;
    inet_ntop(AF_INET, &addr, encrypted_ip_str, sizeof(encrypted_ip_str));
    
    printf("Original IP: %s\n", ip_str);
    printf("Encrypted IP: %s\n", encrypted_ip_str);
    
    // Decrypt the IP address
    uint32_t decrypted_ip = ipcrypt_decrypt(encrypted_ip, key);
    
    // Convert to string for display
    char decrypted_ip_str[16];
    addr.s_addr = decrypted_ip;
    inet_ntop(AF_INET, &addr, decrypted_ip_str, sizeof(decrypted_ip_str));
    
    printf("Decrypted IP: %s\n", decrypted_ip_str);
    
    return 0;
}
```

## Rust Implementation

### Deterministic Mode

```rust
use ipcrypt_rs::IPCrypt;
use std::net::Ipv4Addr;

fn main() {
    // Initialize with a 16-byte key
    let key = hex::decode("000102030405060708090a0b0c0d0e0f").unwrap();
    let ipcrypt = IPCrypt::new(&key);
    
    // Original IP address
    let ip = "192.168.1.1".parse::<Ipv4Addr>().unwrap();
    
    // Encrypt the IP address
    let encrypted_ip = ipcrypt.encrypt_deterministic_v4(&ip);
    
    println!("Original IP: {}", ip);
    println!("Encrypted IP: {}", encrypted_ip);
    
    // Decrypt the IP address
    let decrypted_ip = ipcrypt.decrypt_deterministic_v4(&encrypted_ip);
    
    println!("Decrypted IP: {}", decrypted_ip);
}
```

## Go Implementation

### Deterministic Mode

```go
package main

import (
    "encoding/hex"
    "fmt"
    "net"
    
    "github.com/jedisct1/go-ipcrypt"
)

func main() {
    // Initialize with a 16-byte key
    key, _ := hex.DecodeString("000102030405060708090a0b0c0d0e0f")
    
    // Original IP address
    ip := net.ParseIP("192.168.1.1")
    
    // Encrypt the IP address
    encryptedIP, _ := ipcrypt.EncryptDeterministic(ip, key)
    
    fmt.Printf("Original IP: %s\n", ip)
    fmt.Printf("Encrypted IP: %s\n", encryptedIP)
    
    // Decrypt the IP address
    decryptedIP, _ := ipcrypt.DecryptDeterministic(encryptedIP, key)
    
    fmt.Printf("Decrypted IP: %s\n", decryptedIP)
}
```

## Using IPCrypt in Your Projects

To use IPCrypt in your projects, you can install the appropriate implementation for your programming language:

- **Python**: `pip install ipcrypt`
- **JavaScript**: `npm install ipcrypt`
- **Rust**: `cargo add ipcrypt-rs`
- **Go**: `go get github.com/jedisct1/go-ipcrypt`

For more detailed documentation and examples, visit the [Implementations](/implementations/) page.