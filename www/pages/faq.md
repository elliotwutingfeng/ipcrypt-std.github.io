---
layout: page
title: Frequently Asked Questions
description: Answers to common questions about IPCrypt, its implementation, and use cases.
permalink: /faq/
---

# Frequently Asked Questions

This page provides answers to common questions about IPCrypt, its implementation, and use cases.

## General Questions

### What is IPCrypt?

IPCrypt is a specification that defines well-defined methods for encrypting and obfuscating IP addresses. It provides both deterministic format-preserving and non-deterministic constructions that apply uniformly to both IPv4 and IPv6 addresses.

### Why was IPCrypt created?

IPCrypt was developed to address privacy concerns raised in [RFC6973](https://datatracker.ietf.org/doc/html/rfc6973) and [RFC7258](https://datatracker.ietf.org/doc/html/rfc7258) regarding pervasive monitoring and data collection, while maintaining the operational utility of IP addresses in network operations and analytics.

### Is IPCrypt a standard?

IPCrypt is currently a proposed solution, not yet a standardized protocol. It is being developed as an IETF Internet-Draft with the goal of providing a consistent approach to IP address encryption and obfuscation.

### How does IPCrypt differ from other IP address anonymization techniques?

Unlike ad-hoc mechanisms like simple hashing, truncation, or tokenization, IPCrypt provides:
- Cryptographically sound methods with known security properties
- Consistent implementation across different platforms
- Format preservation when needed
- Correlation protection through non-deterministic modes
- Full invertibility (ability to decrypt)
- Comprehensive documentation

## Technical Questions

### What encryption modes does IPCrypt support?

IPCrypt supports three encryption modes:

1. **ipcrypt-deterministic**: Format-preserving encryption using AES-128 that always produces the same output for the same input and key.
2. **ipcrypt-nd**: Non-deterministic encryption using KIASU-BC with an 8-byte tweak, producing a 24-byte output.
3. **ipcrypt-ndx**: Non-deterministic encryption using AES-XTS with a 16-byte tweak, producing a 32-byte output.

### How does the deterministic mode preserve IP address format?

The deterministic mode uses AES-128 in a single-block operation to encrypt the IP address. The result is then converted back to an IP address format, preserving the structure while changing the actual values.

### Can IPCrypt handle both IPv4 and IPv6 addresses?

Yes, IPCrypt operates by converting both IPv4 and IPv6 addresses to a standard 16-byte representation before encryption, allowing it to handle both address types uniformly.

### What key size does IPCrypt use?

IPCrypt uses a 128-bit (16-byte) key for all encryption modes.

### How secure is IPCrypt?

IPCrypt relies on established cryptographic primitives like AES-128 and AES-XTS, which have been extensively analyzed and are widely trusted. The security of IPCrypt depends on the security of these underlying primitives and proper key management.

## Implementation Questions

### What programming languages have IPCrypt implementations?

IPCrypt has been implemented in multiple programming languages, including:
- Python
- C
- Rust
- JavaScript
- Go
- Zig
- PHP
- D

### How do I install IPCrypt?

Installation depends on the programming language you're using. For example:
- Python: `pip install ipcrypt`
- JavaScript: `npm install ipcrypt`
- Rust: `cargo add ipcrypt-rs`
- Go: `go get github.com/jedisct1/go-ipcrypt`

For other languages, see the [Implementations](/implementations/) page.

### Are all implementations compatible with each other?

Yes, all implementations follow the same specification and produce identical results for the same inputs. This ensures interoperability across different programming languages and platforms.

### How do I generate a secure key for IPCrypt?

You should use a cryptographically secure random number generator to create a 16-byte key. For example:

```python
import os
key = os.urandom(16)
```

Never use predictable keys or hardcoded values in production environments.

## Use Case Questions

### When should I use the deterministic mode?

Use the deterministic mode when:
- You need to preserve the IP address format
- You need to perform lookups or joins on the encrypted addresses
- Correlation between datasets is acceptable for your use case

### When should I use the non-deterministic modes?

Use the non-deterministic modes when:
- Format preservation is not required
- You need to prevent correlation between different datasets
- Maximum privacy protection is required

### Can IPCrypt be used for GDPR compliance?

IPCrypt can be part of a GDPR compliance strategy by helping to pseudonymize IP addresses. However, encryption alone may not be sufficient for full compliance, and you should consult with legal experts for your specific situation.

### Is IPCrypt suitable for logging applications?

Yes, IPCrypt is well-suited for logging applications where you want to:
- Count unique clients
- Implement rate limiting
- Analyze traffic patterns
- All without exposing actual IP addresses

### Can IPCrypt be used with existing systems?

IPCrypt can be integrated with existing systems through various methods:
- As a preprocessing step before storing data
- As a middleware component in data processing pipelines
- As a library integrated directly into applications
- As a service that other applications can call

## Performance Questions

### How fast is IPCrypt?

IPCrypt is designed to be efficient, with performance primarily dependent on the underlying AES implementation. High-performance implementations like the C version can process millions of IP addresses per second on modern hardware.

### Does IPCrypt have any memory requirements?

IPCrypt has minimal memory requirements, typically just a few kilobytes for the implementation and key storage.

### Can IPCrypt be used in high-throughput environments?

Yes, IPCrypt is suitable for high-throughput environments like logging systems, CDNs, and traffic analyzers. The deterministic mode is particularly efficient for these use cases.

## Getting Help

### Where can I report issues or ask questions?

You can report issues or ask questions on the [GitHub repository]({{ site.github_repo }}/issues).

### How can I contribute to IPCrypt?

You can contribute to IPCrypt by:
- Implementing it in additional programming languages
- Improving existing implementations
- Reporting bugs or suggesting enhancements
- Helping with documentation
- Sharing your use cases and experiences

See the [Community](/community/) page for more information.

### Where can I find more resources?

Check out the [Resources](/resources/) page for additional documentation, guides, and examples.