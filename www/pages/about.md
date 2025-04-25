---
layout: page
title: About IPCrypt
description: Learn about IPCrypt, its purpose, benefits, and how it addresses privacy concerns in network operations and analytics.
permalink: /about/
---

## What is IPCrypt?

IPCrypt is a specification that defines well-defined methods for encrypting and obfuscating IP addresses. It provides both deterministic format-preserving and non-deterministic constructions that apply uniformly to both IPv4 and IPv6 addresses.

The specification was developed to address privacy concerns raised in [RFC6973](https://datatracker.ietf.org/doc/html/rfc6973) and [RFC7258](https://datatracker.ietf.org/doc/html/rfc7258) regarding pervasive monitoring and data collection, while maintaining the operational utility of IP addresses in network operations and analytics.

## The Problem IPCrypt Solves

IP addresses are essential for network operations but also raise significant privacy concerns:

1. **Privacy Exposure**: IP addresses can reveal user location, identity, and browsing habits
2. **Regulatory Compliance**: Many jurisdictions classify IP addresses as personal data (e.g., GDPR)
3. **Data Sharing Limitations**: Inability to share network data for research or analysis
4. **Third-Party Service Risks**: Exposing raw IP addresses to external services creates privacy risks
5. **Inconsistent Ad-hoc Solutions**: Organizations implement varied, often insecure methods to protect IP addresses

IPCrypt addresses these challenges by providing a cryptographically sound, consistent approach to IP address encryption and obfuscation.

## Key Benefits

### For Network Operators

- **Maintain Operational Functionality**: Continue using IP addresses for routing, logging, and analytics while protecting user privacy
- **Regulatory Compliance**: Help meet data protection requirements by encrypting personal identifiers
- **Simplified Data Sharing**: Share network data with researchers or partners without exposing sensitive information
- **Consistent Implementation**: Replace ad-hoc mechanisms with a well-defined specification

### For Privacy Advocates

- **Enhanced User Privacy**: Protect user identity and location information in logs and analytics
- **Reduced Correlation Risk**: Non-deterministic modes prevent tracking across different datasets
- **Transparent Protection**: Clearly defined cryptographic methods with known security properties
- **Broad Applicability**: Works with both IPv4 and IPv6 addresses across various systems

### For Developers

- **Multiple Implementations**: Choose from implementations in various programming languages
- **Flexible Modes**: Select the appropriate mode based on specific privacy and operational requirements
- **Simple Integration**: Easy to integrate into existing systems with minimal changes
- **Well-Documented Standard**: Clear specification with test vectors and examples

## How IPCrypt Works

IPCrypt operates by converting IP addresses to a 16-byte representation and then applying cryptographic operations:

1. **IP Address Conversion**: Both IPv4 and IPv6 addresses are converted to a standard 16-byte format
2. **Encryption**: The 16-byte representation is encrypted using one of three modes:
   - **Deterministic**: Using AES-128 as a single-block operation
   - **Non-deterministic (ND)**: Using KIASU-BC with an 8-byte tweak
   - **Non-deterministic Extended (NDX)**: Using AES-XTS with a 16-byte tweak
3. **Output**: The encrypted result is either returned as a 16-byte value (deterministic) or combined with the tweak (non-deterministic)

## Encryption Modes Explained

### ipcrypt-deterministic

- Uses AES-128 in a single-block operation
- Produces a 16-byte output that can be converted back to an IP address format
- Always produces the same output for a given input and key
- Suitable for applications where format preservation is required and linkability is acceptable

### ipcrypt-nd

- Uses the KIASU-BC tweakable block cipher with an 8-byte tweak
- Produces a 24-byte output (8-byte tweak + 16-byte ciphertext)
- Different outputs for the same input due to random tweak
- Suitable for applications where correlation protection is important

### ipcrypt-ndx

- Uses the AES-XTS tweakable block cipher with a 16-byte tweak
- Produces a 32-byte output (16-byte tweak + 16-byte ciphertext)
- Highest security margin with 128-bit tweak space
- Suitable for applications requiring maximum security and correlation protection

## Use Cases

### Privacy-Preserving Logging

Store encrypted IP addresses in logs instead of cleartext addresses. This allows for:
- Counting unique clients
- Implementing rate limiting
- Analyzing traffic patterns
- All without exposing actual IP addresses

### Secure Data Sharing

Share network data with researchers, partners, or third parties while protecting user privacy:
- Research institutions can analyze traffic patterns
- Security firms can investigate incidents
- Partners can process data without accessing sensitive information

### Third-Party Service Integration

Use encrypted IP addresses when integrating with external services:
- CDN providers
- DDoS protection services
- Analytics platforms
- Cloud services

### Regulatory Compliance

Help meet data protection requirements by encrypting IP addresses:
- GDPR compliance in the European Union
- CCPA compliance in California
- Other regional privacy regulations

## Comparison with Ad-hoc Mechanisms

Many organizations currently use ad-hoc mechanisms to protect IP addresses, such as:

1. **Simple Hashing**: Vulnerable to rainbow table attacks
2. **Truncation**: Removes information but doesn't provide cryptographic protection
3. **Tokenization**: Often lacks consistency and security guarantees
4. **Custom Encryption**: May have unknown security properties or implementation flaws

IPCrypt offers several advantages over these approaches:

| Feature                     | Ad-hoc Mechanisms    | IPCrypt                              |
| --------------------------- | -------------------- | ------------------------------------ |
| Consistency                 | Varies widely        | Well-defined specification           |
| Security Properties         | Often unclear        | Cryptographically sound              |
| Implementation Availability | Limited              | Multiple languages                   |
| Format Preservation         | Not always supported | Available in deterministic mode      |
| Correlation Protection      | Rarely addressed     | Supported in non-deterministic modes |
| Decryption Capability       | Often one-way        | Fully invertible                     |
| Documentation               | Typically minimal    | Comprehensive specification          |

## Getting Started

Ready to implement IPCrypt in your project? Check out our [developer resources]({{ site.baseurl }}/resources/) and choose from [multiple language implementations]({{ site.baseurl }}/implementations/).

For a detailed understanding of the cryptographic constructions, read the full [specification](https://jedisct1.github.io/draft-denis-ipcrypt/draft-denis-ipcrypt.html){:target="_blank" rel="noopener"}.