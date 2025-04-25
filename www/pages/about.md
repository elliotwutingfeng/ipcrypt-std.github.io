---
layout: page
title: About IPCrypt
description: Learn about IPCrypt, its purpose, benefits, and how it addresses privacy concerns in network operations and analytics.
permalink: /about/
---

## What is IPCrypt?

IPCrypt is a simple, open specification that suggests methods for encrypting and obfuscating IP addresses. Created by volunteers, it offers both deterministic format-preserving and non-deterministic approaches that work with both IPv4 and IPv6 addresses.

This community-driven effort was inspired by privacy concerns highlighted in [RFC6973](https://datatracker.ietf.org/doc/html/rfc6973) and [RFC7258](https://datatracker.ietf.org/doc/html/rfc7258) about pervasive monitoring and data collection. We aimed to help maintain the practical utility of IP addresses in network operations while addressing these privacy considerations.

## The Challenge We're Trying to Help With

IP addresses are fundamental to network operations but present some privacy challenges:

1. **Privacy Considerations**: IP addresses can potentially reveal information about users
2. **Regulatory Context**: Some jurisdictions consider IP addresses as personal data (e.g., GDPR)
3. **Research Limitations**: Difficulty sharing network data for research or analysis
4. **Service Provider Concerns**: Sharing raw IP addresses with external services raises privacy questions
5. **Varied Approaches**: Different organizations use different methods to protect IP addresses

IPCrypt tries to offer a simple, consistent approach to IP address encryption that anyone can implement.

## Potential Benefits

### For Network Operators

- **Practical Functionality**: Use IP addresses for routing, logging, and analytics while considering privacy
- **Regulatory Considerations**: May help with data protection requirements by encrypting identifiers
- **Research Possibilities**: Share network data with researchers without exposing raw addresses
- **Common Approach**: Use a shared specification instead of creating custom solutions

### For Privacy Advocates

- **User Privacy**: Help protect user information in logs and analytics
- **Reduced Tracking**: Non-deterministic modes can prevent correlation across datasets
- **Open Methods**: Clearly defined cryptographic approaches with known properties
- **Versatile Application**: Works with both IPv4 and IPv6 addresses

### For Developers

- **Community Implementations**: Free implementations available in various programming languages
- **Different Options**: Choose the mode that fits your specific needs
- **Straightforward Integration**: Designed to be simple to add to existing systems
- **Open Documentation**: Clear specification with examples to help implementation

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