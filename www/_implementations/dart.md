---
layout: implementation
title: IPCrypt Dart Implementation
description: Dart implementation of IPCrypt supporting all three encryption modes with native Dart SDK.
permalink: /implementations/dart/
language: Dart
repository: https://github.com/elliotwutingfeng/ipcrypt
package_manager: pub.dev
package_url: https://pub.dev/packages/ipcrypt
examples:
  - title: Deterministic Encryption
    description: Encrypt an IP address using deterministic mode
    code: |
      import 'package:ipcrypt/ipcrypt.dart';

      void main() {
        // 16-byte key as hex string
        String key = '2b7e151628aed2a6abf7158809cf4f3c';

        // Encrypt an IP address
        String encryptedIp = ipCryptDeterministic.encrypt(
          '192.0.2.1',
          hexStringToBytes(key),
        );
        print('Encrypted IP: $encryptedIp');

        // Decrypt back to the original
        String decryptedIp = ipCryptDeterministic.decrypt(
          encryptedIp,
          hexStringToBytes(key),
        );
        print('Decrypted IP: $decryptedIp');
      }
  - title: Non-Deterministic Encryption
    description: Encrypt an IP address using non-deterministic mode with KIASU-BC
    code: |
      import 'package:ipcrypt/ipcrypt.dart';
      import 'dart:typed_data';

      void main() {
        // 16-byte key as hex string
        String key = '2b7e151628aed2a6abf7158809cf4f3c';

        // 8-byte tweak for randomization
        Uint8List tweak = Uint8List.fromList([
          0x08,
          0xe0,
          0xc2,
          0x89,
          0xbf,
          0xf2,
          0x3b,
          0x7c,
        ]);

        // Encrypt an IP address
        Uint8List encryptedData = ipCryptNonDeterministic.encrypt(
          '192.0.2.1',
          hexStringToBytes(key),
          tweak,
        );
        print(
          'Encrypted data: ${encryptedData.map((b) => b.toRadixString(16).padLeft(2, '0')).join()}',
        );

        // Decrypt back to the original
        String decryptedIp = ipCryptNonDeterministic.decrypt(
          encryptedData,
          hexStringToBytes(key),
        );
        print('Decrypted IP: $decryptedIp');
      }
  - title: Extended Non-Deterministic Encryption
    description: Encrypt an IP address using extended non-deterministic mode
    code: |
      import 'package:ipcrypt/ipcrypt.dart';
      import 'dart:typed_data';

      void main() {
        // 32-byte key as hex string (two 16-byte keys)
        String key =
            '2b7e151628aed2a6abf7158809cf4f3c1032547698badcfeefcdab8967452301';

        // 16-byte tweak for enhanced randomization
        Uint8List tweak = Uint8List.fromList([
          0x21,
          0xbd,
          0x18,
          0x34,
          0xbc,
          0x08,
          0x8c,
          0xd2,
          0xb4,
          0xec,
          0xbe,
          0x30,
          0xb7,
          0x08,
          0x98,
          0xd7,
        ]);

        // Encrypt an IPv6 address
        Uint8List encryptedData = ipCryptExtendedNonDeterministic.encrypt(
          '2001:db8::1',
          hexStringToBytes(key),
          tweak,
        );
        print(
          'Encrypted data: ${encryptedData.map((b) => b.toRadixString(16).padLeft(2, '0')).join()}',
        );

        // Decrypt back to the original
        String decryptedIp = ipCryptExtendedNonDeterministic.decrypt(
          encryptedData,
          hexStringToBytes(key),
        );
        print('Decrypted IP: $decryptedIp');
      }
---

## IPCrypt Dart Implementation

A Dart implementation of IPCrypt that provides IP address encryption and obfuscation methods following the IPCrypt specification. This implementation supports all three encryption modes and is designed for native Dart applications.

## Installation

Add IPCrypt to your `pubspec.yaml` file:

```yaml
dependencies:
  ipcrypt: any
```

Then run:

```bash
dart pub get
```

## Requirements

- Dart SDK 3.9 or higher
- No external dependencies

## Usage

The Dart implementation provides three encryption methods as global functions:

1. `ipCryptDeterministic` - Deterministic encryption using AES-128
2. `ipCryptNonDeterministic` - Non-deterministic encryption using KIASU-BC
3. `ipCryptExtendedNonDeterministic` - Extended non-deterministic encryption

### Deterministic Encryption

```dart
import 'package:ipcrypt/ipcrypt.dart';

void main() {
  // 16-byte key as hex string
  String key = '2b7e151628aed2a6abf7158809cf4f3c';

  // Encrypt an IP address
  String encryptedIp = ipCryptDeterministic.encrypt(
    '192.0.2.1',
    hexStringToBytes(key),
  );
  print('Encrypted IP: $encryptedIp');

  // Decrypt back to the original
  String decryptedIp = ipCryptDeterministic.decrypt(
    encryptedIp,
    hexStringToBytes(key),
  );
  print('Decrypted IP: $decryptedIp');
}
```

### Non-Deterministic Encryption

```dart
import 'package:ipcrypt/ipcrypt.dart';
import 'dart:typed_data';

void main() {
  // 16-byte key as hex string
  String key = '2b7e151628aed2a6abf7158809cf4f3c';

  // 8-byte tweak for randomization
  Uint8List tweak = Uint8List.fromList([
    0x08,
    0xe0,
    0xc2,
    0x89,
    0xbf,
    0xf2,
    0x3b,
    0x7c,
  ]);

  // Encrypt an IP address
  Uint8List encryptedData = ipCryptNonDeterministic.encrypt(
    '192.0.2.1',
    hexStringToBytes(key),
    tweak,
  );
  print(
    'Encrypted data: ${encryptedData.map((b) => b.toRadixString(16).padLeft(2, '0')).join()}',
  );

  // Decrypt back to the original
  String decryptedIp = ipCryptNonDeterministic.decrypt(
    encryptedData,
    hexStringToBytes(key),
  );
  print('Decrypted IP: $decryptedIp');
}
```

### Extended Non-Deterministic Encryption

```dart
import 'package:ipcrypt/ipcrypt.dart';
import 'dart:typed_data';

void main() {
  // 32-byte key as hex string (two 16-byte keys)
  String key =
      '2b7e151628aed2a6abf7158809cf4f3c1032547698badcfeefcdab8967452301';

  // 16-byte tweak for enhanced randomization
  Uint8List tweak = Uint8List.fromList([
    0x21,
    0xbd,
    0x18,
    0x34,
    0xbc,
    0x08,
    0x8c,
    0xd2,
    0xb4,
    0xec,
    0xbe,
    0x30,
    0xb7,
    0x08,
    0x98,
    0xd7,
  ]);

  // Encrypt an IPv6 address
  Uint8List encryptedData = ipCryptExtendedNonDeterministic.encrypt(
    '2001:db8::1',
    hexStringToBytes(key),
    tweak,
  );
  print(
    'Encrypted data: ${encryptedData.map((b) => b.toRadixString(16).padLeft(2, '0')).join()}',
  );

  // Decrypt back to the original
  String decryptedIp = ipCryptExtendedNonDeterministic.decrypt(
    encryptedData,
    hexStringToBytes(key),
  );
  print('Decrypted IP: $decryptedIp');
}
```

## API Reference

### Deterministic Encryption

```dart
// Encrypt an IP address
String ipCryptDeterministic.encrypt(String ipAddress, Uint8List key)

// Decrypt an encrypted IP address
String ipCryptDeterministic.decrypt(String encryptedIp, Uint8List key)
```

**Parameters:**
- `ipAddress`: IPv4 or IPv6 address as a string
- `encryptedIp`: Encrypted IP address as a string
- `key`: 16-byte key as Uint8List

**Returns:** IP address as a string

### Non-Deterministic Encryption

```dart
// Encrypt an IP address
Uint8List ipCryptNonDeterministic.encrypt(String ipAddress, Uint8List key, Uint8List tweak)

// Decrypt encrypted data
String ipCryptNonDeterministic.decrypt(Uint8List encryptedData, Uint8List key)
```

**Parameters:**
- `ipAddress`: IPv4 or IPv6 address as a string
- `key`: 16-byte key as Uint8List
- `tweak`: 8-byte tweak as Uint8List
- `encryptedData`: Encrypted data as Uint8List (24 bytes: 8-byte tweak + 16-byte ciphertext)

**Returns:** Encrypted data as Uint8List or decrypted IP address as string

### Extended Non-Deterministic Encryption

```dart
// Encrypt an IP address
Uint8List ipCryptExtendedNonDeterministic.encrypt(String ipAddress, String key, Uint8List tweak)

// Decrypt encrypted data
String ipCryptExtendedNonDeterministic.decrypt(Uint8List encryptedData, String key)
```

**Parameters:**
- `ipAddress`: IPv4 or IPv6 address as a string
- `key`: 32-byte key as Uint8List
- `tweak`: 16-byte tweak as Uint8List
- `encryptedData`: Encrypted data as Uint8List (32 bytes: 16-byte tweak + 16-byte ciphertext)

**Returns:** Encrypted data as Uint8List or decrypted IP address as string

## Implementation Details

The Dart implementation includes:

1. **IP Address Conversion**: Functions to convert between IP addresses and 16-byte representations
2. **AES-128 Implementation**: Native Dart implementation for deterministic mode
3. **KIASU-BC Implementation**: Implementation of the KIASU-BC tweakable block cipher
4. **Extended Encryption**: Enhanced encryption with larger keys and tweaks

## Supported Features

- ✅ IPv4 address encryption/decryption
- ✅ IPv6 address encryption/decryption
- ✅ Deterministic encryption (AES-128)
- ✅ Non-deterministic encryption (KIASU-BC)
- ✅ Extended non-deterministic encryption
- ✅ Custom tweak support
- ✅ Native Dart implementation (no external dependencies)

## Performance Considerations

This Dart implementation prioritizes compatibility and ease of use. For high-performance applications requiring millions of operations per second, consider using the C, Rust, or Go implementations.

The Dart implementation is well-suited for:
- Mobile applications (Flutter)
- Web applications
- Server-side Dart applications
- Development and testing environments

## Package Information

- **Package Name**: `ipcrypt`
- **Platform**: [pub.dev](https://pub.dev/packages/ipcrypt)
- **License**: ISC License
- **Repository**: [GitHub](https://github.com/elliotwutingfeng/ipcrypt)

## Example Project

```dart
import 'package:ipcrypt/ipcrypt.dart';
import 'dart:typed_data';

void demonstrateIPCrypt() {
  // Test data
  Uint8List key16 = hexStringToBytes('2b7e151628aed2a6abf7158809cf4f3c');
  Uint8List key32 = hexStringToBytes(
    '2b7e151628aed2a6abf7158809cf4f3c1032547698badcfeefcdab8967452301',
  );
  String ipv4 = '192.0.2.1';
  String ipv6 = '2001:db8::1';

  print('=== IPCrypt Dart Demo ===\n');

  // Deterministic encryption
  print('1. Deterministic Encryption:');
  String encIPv4 = ipCryptDeterministic.encrypt(ipv4, key16);
  String decIPv4 = ipCryptDeterministic.decrypt(encIPv4, key16);
  print('   Original: $ipv4');
  print('  Encrypted: $encIPv4');
  print('  Decrypted: $decIPv4\n');

  // Non-deterministic encryption
  print('2. Non-Deterministic Encryption:');
  Uint8List tweak8 = Uint8List.fromList([
    0x08,
    0xe0,
    0xc2,
    0x89,
    0xbf,
    0xf2,
    0x3b,
    0x7c,
  ]);
  Uint8List encData = ipCryptNonDeterministic.encrypt(ipv4, key16, tweak8);
  String decIPv4ND = ipCryptNonDeterministic.decrypt(encData, key16);
  print('   Original: $ipv4');
  print(
    '  Encrypted: ${encData.map((b) => b.toRadixString(16).padLeft(2, '0')).join()}',
  );
  print('  Decrypted: $decIPv4ND\n');

  // Extended non-deterministic encryption
  print('3. Extended Non-Deterministic Encryption:');
  Uint8List tweak16 = Uint8List.fromList([
    0x21,
    0xbd,
    0x18,
    0x34,
    0xbc,
    0x08,
    0x8c,
    0xd2,
    0xb4,
    0xec,
    0xbe,
    0x30,
    0xb7,
    0x08,
    0x98,
    0xd7,
  ]);
  Uint8List encDataExt = ipCryptExtendedNonDeterministic.encrypt(
    ipv6,
    key32,
    tweak16,
  );
  String decIPv6Ext = ipCryptExtendedNonDeterministic.decrypt(
    encDataExt,
    key32,
  );
  print('   Original: $ipv6');
  print(
    '  Encrypted: ${encDataExt.map((b) => b.toRadixString(16).padLeft(2, '0')).join()}',
  );
  print('  Decrypted: $decIPv6Ext');
}

void main() {
  demonstrateIPCrypt();
}
```

## License

The Dart implementation is licensed under the ISC License.
