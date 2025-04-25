---
layout: page
title: IPCrypt Implementations
description: Explore the various implementations of IPCrypt across different programming languages, including Python, C, Rust, JavaScript, Go, Zig, PHP, and D.
permalink: /implementations/
---

# IPCrypt Implementations

IPCrypt has been implemented in multiple programming languages to ensure broad accessibility and ease of integration across different platforms and environments. Each implementation follows the specification and provides the same cryptographic guarantees.

## Consistent Implementation Approach

IPCrypt's elegant simplicity is reflected in its implementations. By relying exclusively on established cryptographic standards, IPCrypt ensures:

- **Consistent Behavior**: All implementations produce identical results for the same inputs
- **Simplified Adoption**: Clear specifications make implementation straightforward
- **Reduced Complexity**: No proprietary algorithms or complex dependencies
- **Cross-Platform Reliability**: Works consistently across diverse environments
- **Interoperability**: Different implementations can work together seamlessly

This pragmatic approach prioritizes reliability and ease of adoption over unnecessary complexity, making IPCrypt an ideal solution for organizations needing secure IP address encryption.

## Available Implementations

Below is a comprehensive list of all available IPCrypt implementations. Click on an implementation to view detailed documentation, installation instructions, and usage examples.

<div class="implementation-grid">
    <div class="implementation-card">
        <span class="language-badge">Python</span>
        <h3 class="text-xl font-bold">Python</h3>
        <p>Reference implementation with all three modes.</p>
        <p class="text-sm text-gray-600 mt-2">
            <span class="text-primary">✓</span> Detailed documentation available
        </p>
        <p class="mt-4">
            <a href="{{ site.baseurl }}/implementations/python/" class="btn btn-primary btn-sm">Documentation</a>
            <a href="https://github.com/jedisct1/draft-denis-ipcrypt/tree/main/implementations/python" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">GitHub</a>
        </p>
    </div>
    
    <div class="implementation-card">
        <span class="language-badge">C</span>
        <h3 class="text-xl font-bold">C</h3>
        <p>High-performance implementation (ipcrypt2).</p>
        <p class="mt-4">
            <a href="https://github.com/jedisct1/ipcrypt2" class="btn btn-primary btn-sm" target="_blank" rel="noopener">GitHub</a>
        </p>
    </div>
    
    <div class="implementation-card">
        <span class="language-badge">Rust</span>
        <h3 class="text-xl font-bold">Rust</h3>
        <p>Native implementation and C bindings.</p>
        <p class="mt-4">
            <a href="https://docs.rs/ipcrypt_rs" class="btn btn-primary btn-sm" target="_blank" rel="noopener">ipcrypt-rs</a>
            <a href="https://docs.rs/ipcrypt2" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">rust-ipcrypt2</a>
        </p>
    </div>
    
    <div class="implementation-card">
        <span class="language-badge">JavaScript</span>
        <h3 class="text-xl font-bold">JavaScript</h3>
        <p>Browser and Node.js compatible implementation.</p>
        <p class="mt-4">
            <a href="https://github.com/jedisct1/ipcrypt-js" class="btn btn-primary btn-sm" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.npmjs.com/package/ipcrypt" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">npm</a>
        </p>
    </div>
    
    <div class="implementation-card">
        <span class="language-badge">Go</span>
        <h3 class="text-xl font-bold">Go</h3>
        <p>Concurrent-friendly implementation for Go applications.</p>
        <p class="mt-4">
            <a href="https://github.com/jedisct1/go-ipcrypt" class="btn btn-primary btn-sm" target="_blank" rel="noopener">GitHub</a>
        </p>
    </div>
    
    <div class="implementation-card">
        <span class="language-badge">Zig</span>
        <h3 class="text-xl font-bold">Zig</h3>
        <p>Low-level implementation with compile-time features.</p>
        <p class="mt-4">
            <a href="https://github.com/jedisct1/zig-ipcrypt" class="btn btn-primary btn-sm" target="_blank" rel="noopener">GitHub</a>
        </p>
    </div>
    
    <div class="implementation-card">
        <span class="language-badge">PHP</span>
        <h3 class="text-xl font-bold">PHP</h3>
        <p>Web-friendly implementation for PHP applications.</p>
        <p class="mt-4">
            <a href="https://github.com/jedisct1/php-ipcrypt" class="btn btn-primary btn-sm" target="_blank" rel="noopener">GitHub</a>
        </p>
    </div>
    
    <div class="implementation-card">
        <span class="language-badge">D</span>
        <h3 class="text-xl font-bold">D</h3>
        <p>Bindings to the C implementation (d-ipcrypt2).</p>
        <p class="mt-4">
            <a href="https://github.com/kassane/d-ipcrypt2" class="btn btn-primary btn-sm" target="_blank" rel="noopener">GitHub</a>
        </p>
    </div>
</div>

## Implementation Documentation

Each implementation has (or will have) a dedicated documentation page with:

- **Installation Instructions**: How to add the implementation to your project
- **Basic Usage Examples**: Code samples for all three encryption modes
- **API Documentation**: Detailed method descriptions and parameter explanations
- **Implementation Details**: Information about the underlying cryptographic operations
- **Performance Considerations**: Guidance on optimizing for different use cases
- **Test Vectors**: Information on verifying the implementation

Currently, detailed documentation is available for:
- [Python Implementation]({{ site.baseurl }}/implementations/python/)

We're working on creating similar documentation for all other implementations. If you'd like to contribute documentation for an implementation, please see the [contribution guidelines]({{ site.baseurl }}/community/).

## Implementation Features

All implementations provide the following features:

- **Multiple Encryption Modes**: Support for `ipcrypt-deterministic`, `ipcrypt-nd`, and `ipcrypt-ndx`
- **IPv4 and IPv6 Support**: Uniform handling of both address types
- **Format Preservation**: Deterministic mode preserves IP address format
- **Correlation Protection**: Non-deterministic modes prevent correlation attacks
- **Test Vector Compliance**: Verified against the specification's test vectors

## Choosing an Implementation

Thanks to IPCrypt's consistent approach, all implementations provide identical cryptographic guarantees and functionality. This means you can choose an implementation based primarily on practical considerations rather than security differences:

1. **Language Compatibility**: Choose an implementation that integrates well with your existing codebase
2. **Performance Requirements**: Some implementations (like C and Rust) may offer better performance
3. **Platform Constraints**: Consider browser compatibility, memory usage, and deployment environment
4. **Feature Needs**: All implementations support the core features, but some may offer additional utilities
5. **Maintenance Preferences**: Consider your team's familiarity with the language and ecosystem

The beauty of IPCrypt's design is that you can switch between implementations as your needs evolve, without changing the underlying security properties or encryption results.

## Implementation Details

Each implementation page provides:

- Installation instructions
- Basic usage examples
- API documentation
- Advanced usage patterns
- Performance considerations
- Links to source code repositories

## Creating a New Implementation

If you'd like to create an implementation in a language not currently supported, please follow these guidelines:

1. Implement all three encryption modes as specified in the document
2. Verify your implementation against the test vectors
3. Document your API and provide usage examples
4. Submit your implementation to the [GitHub repository]({{ site.github_repo }})

### Documentation Template

To ensure consistency across implementation documentation, we recommend creating a documentation page with the following structure:

1. **Overview**: Brief description of the implementation
2. **Installation**: How to install or include the implementation
3. **Requirements**: Dependencies and system requirements
4. **Usage Examples**: Code samples for all three encryption modes
5. **API Reference**: Detailed method descriptions
6. **Implementation Details**: Technical information about the implementation
7. **Performance Considerations**: Guidance on optimizing for different use cases
8. **Test Vectors**: Information on verifying the implementation
9. **License**: Licensing information

You can use the [Python implementation documentation]({{ site.baseurl }}/implementations/python/) as a reference. For detailed guidance on creating a new implementation, see the [contribution guidelines]({{ site.baseurl }}/community/).

## Implementation Comparison

<div class="overflow-x-auto">
    <table class="min-w-full bg-white border">
        <thead>
            <tr>
                <th class="py-2 px-4 border">Language</th>
                <th class="py-2 px-4 border">Type</th>
                <th class="py-2 px-4 border">Deterministic</th>
                <th class="py-2 px-4 border">ND (KIASU-BC)</th>
                <th class="py-2 px-4 border">NDX (AES-XTS)</th>
                <th class="py-2 px-4 border">IPv4</th>
                <th class="py-2 px-4 border">IPv6</th>
                <th class="py-2 px-4 border">License</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="py-2 px-4 border">Python</td>
                <td class="py-2 px-4 border">Native</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border">ISC</td>
            </tr>
            <tr>
                <td class="py-2 px-4 border">C</td>
                <td class="py-2 px-4 border">Native</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border">ISC</td>
            </tr>
            <tr>
                <td class="py-2 px-4 border">Rust</td>
                <td class="py-2 px-4 border">Native/Bindings</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border">ISC</td>
            </tr>
            <tr>
                <td class="py-2 px-4 border">JavaScript</td>
                <td class="py-2 px-4 border">Native</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border">ISC</td>
            </tr>
            <tr>
                <td class="py-2 px-4 border">Go</td>
                <td class="py-2 px-4 border">Native</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border">ISC</td>
            </tr>
            <tr>
                <td class="py-2 px-4 border">Zig</td>
                <td class="py-2 px-4 border">Native</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border">ISC</td>
            </tr>
            <tr>
                <td class="py-2 px-4 border">PHP</td>
                <td class="py-2 px-4 border">Native</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border">ISC</td>
            </tr>
            <tr>
                <td class="py-2 px-4 border">D</td>
                <td class="py-2 px-4 border">Bindings</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border text-center">✓</td>
                <td class="py-2 px-4 border">ISC</td>
            </tr>
        </tbody>
            </table>
        </div>
        
        ## Contributing to Implementations
        
        We welcome contributions to existing implementations and the creation of new ones. Here are some ways you can contribute:
        
        1. **Bug Fixes**: Help improve existing implementations by fixing bugs or addressing issues
        2. **Performance Improvements**: Optimize implementations for better performance
        3. **Documentation**: Create or improve documentation for implementations
        4. **New Features**: Add new features or enhancements to existing implementations
        5. **New Implementations**: Create implementations for languages not currently supported
        
        If you're interested in contributing, please:
        
        1. Check the [GitHub repository]({{ site.github_repo }}) for open issues
        2. Review the [contribution guidelines]({{ site.baseurl }}/community/)
        3. Join the [community discussion]({{ site.baseurl }}/community/) to coordinate with other contributors
        
        Your contributions help make IPCrypt more accessible and useful for everyone!