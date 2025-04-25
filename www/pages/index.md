---
layout: default
title: IPCrypt - IP Address Encryption and Obfuscation
description: Proposed methods for encrypting and obfuscating IP addresses, providing both deterministic format-preserving and non-deterministic constructions, with implementations in Python, C, Rust, JavaScript, Go, Zig, PHP, and D.
permalink: /
---

<section class="hero">
    <div class="container mx-auto px-4 py-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Protect IP Addresses with Consistent Encryption</h1>
        <p class="text-xl max-w-3xl mx-auto mb-8">
            IPCrypt provides well-defined methods for encrypting and obfuscating IP addresses, addressing privacy concerns while maintaining functionality for network operations and analytics.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="{{ site.baseurl }}/about/" class="btn btn-primary">Learn More</a>
            <a href="https://jedisct1.github.io/draft-denis-ipcrypt/draft-denis-ipcrypt.html" class="btn btn-secondary" target="_blank" rel="noopener">Read the Specification</a>
        </div>
    </div>
</section>

<section class="py-12 bg-white">
    <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold mb-6 text-center">What is IPCrypt?</h2>
            <p class="text-lg mb-6">
                IPCrypt is a specification that defines methods for encrypting and obfuscating IP addresses for both operational use and privacy preservation. It enables network operators, researchers, and privacy advocates to share or analyze data while protecting sensitive address information.
            </p>
            <p class="text-lg mb-6">
                The specification provides both deterministic format-preserving and non-deterministic constructions that apply uniformly to both IPv4 and IPv6 addresses.
            </p>
            <p class="text-lg mb-6">
                <strong>Elegant simplicity</strong> is at the core of IPCrypt's design philosophy. Rather than pursuing technical innovation for its own sake, IPCrypt relies exclusively on established cryptographic standards to ensure robust implementation across platforms.
            </p>
        </div>
    </div>
</section>

<section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Key Features</h2>
        
        <div class="features-grid">
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Privacy Protection</h3>
                <p>
                    Encrypt IP addresses to prevent disclosure of user-specific information when data is logged or measured, as discussed in RFC6973.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Format Preservation</h3>
                <p>
                    Ensure that encrypted output remains a valid IP address, allowing network devices to process the data without modification.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Correlation Protection</h3>
                <p>
                    Non-deterministic modes use a random tweak to obscure linkability while keeping the underlying input confidential.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Privacy-Preserving Analytics</h3>
                <p>
                    Perform common operations like counting unique clients or implementing rate limiting using encrypted IP addresses without accessing original values.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Third-Party Service Integration</h3>
                <p>
                    Use encrypted IP addresses as keys or identifiers when integrating with potentially untrusted third-party services or cloud providers.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Consistent Approach</h3>
                <p>
                    Replace ad-hoc mechanisms with a well-defined, cryptographically sound specification that can be implemented consistently across systems.
                </p>
            </div>
        </div>
    </div>
</section>

<section class="py-12 bg-white">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">Pragmatic Standardization</h2>
        <div class="max-w-3xl mx-auto">
            <p class="text-lg mb-6">
                IPCrypt serves as a <strong>proposed solution</strong> that prioritizes reliability and ease of adoption over unnecessary complexity. By providing clear guidance and interoperability, IPCrypt enables organizations to implement secure IP address encryption with confidence.
            </p>
            <p class="text-lg mb-6">
                Rather than reinventing the wheel, IPCrypt leverages well-established cryptographic primitives and provides a consistent framework that can be implemented across diverse environments and programming languages.
            </p>
        </div>
    </div>
</section>

<section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">Encryption Modes</h2>
        <p class="text-lg text-center max-w-3xl mx-auto mb-12">
            IPCrypt defines three concrete instantiations to meet different privacy and operational requirements:
        </p>
        
        <div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div class="card">
                <h3 class="text-xl font-bold mb-3">ipcrypt-deterministic</h3>
                <p class="mb-4">
                    Deterministic encryption using AES128 (applied as a single-block operation).
                </p>
                <p class="text-sm text-gray-600">
                    Preserves format but reveals repeated inputs.
                </p>
            </div>
            
            <div class="card">
                <h3 class="text-xl font-bold mb-3">ipcrypt-nd</h3>
                <p class="mb-4">
                    Non-deterministic encryption using the KIASU-BC tweakable block cipher with an 8-byte tweak.
                </p>
                <p class="text-sm text-gray-600">
                    Produces a 24-byte output using an 8-byte tweak.
                </p>
            </div>
            
            <div class="card">
                <h3 class="text-xl font-bold mb-3">ipcrypt-ndx</h3>
                <p class="mb-4">
                    Non-deterministic encryption using the AES-XTS tweakable block cipher with a 16-byte tweak.
                </p>
                <p class="text-sm text-gray-600">
                    Produces a 32-byte output using a 16-byte tweak.
                </p>
            </div>
        </div>
    </div>
</section>

<section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">Multiple Language Implementations</h2>
        <div class="max-w-4xl mx-auto">
            <div class="card">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                        <h3 class="text-xl font-bold mb-3">Available in 8+ Programming Languages</h3>
                        <p class="mb-4">
                            IPCrypt has been implemented in Python, C, Rust, JavaScript, Go, Zig, PHP, D, and more to ensure broad accessibility across different platforms and environments.
                        </p>
                        <p class="mb-6">
                            Each implementation follows the specification and provides the same cryptographic guarantees while leveraging language-specific features.
                        </p>
                        <a href="{{ site.baseurl }}/implementations/" class="btn btn-primary">Browse All Implementations</a>
                    </div>
                    <div class="md:w-1/3">
                        <div class="language-badges-container">
                            <span class="language-badge">Python</span>
                            <span class="language-badge">C</span>
                            <span class="language-badge">Rust</span>
                            <span class="language-badge">JavaScript</span>
                            <span class="language-badge">Go</span>
                            <span class="language-badge">Zig</span>
                            <span class="language-badge">PHP</span>
                            <span class="language-badge">D</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-12 bg-white">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">Interactive Playground</h2>
        <div class="max-w-4xl mx-auto">
            <div class="card">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                        <h3 class="text-xl font-bold mb-3">Try IPCrypt in Your Browser</h3>
                        <p class="mb-4">
                            Experience IPCrypt directly in your browser with our interactive playground. Encrypt and decrypt IP addresses using different modes, generate random keys and tweaks, and see the results instantly.
                        </p>
                        <p class="mb-6">
                            The playground uses the JavaScript implementation of IPCrypt, allowing you to test all three encryption modes with both IPv4 and IPv6 addresses.
                        </p>
                        <a href="{{ site.baseurl }}/playground/" class="btn btn-primary">Try the Playground</a>
                    </div>
                    <div class="md:w-1/3">
                        <div class="bg-gray-100 p-4 rounded-lg text-center">
                            <div class="font-mono text-sm mb-2">192.168.1.1</div>
                            <div class="text-2xl mb-2">↓</div>
                            <div class="font-mono text-sm">10.237.143.87</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">Get Started with IPCrypt</h2>
        <p class="text-lg max-w-3xl mx-auto mb-8">
            Ready to implement IPCrypt in your project? Check out our developer resources, try the interactive playground, and choose from multiple language implementations.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="https://jedisct1.github.io/draft-denis-ipcrypt/draft-denis-ipcrypt.html" class="btn btn-secondary" target="_blank" rel="noopener">Read the Specification</a>
            <a href="{{ site.baseurl }}/playground/" class="btn btn-primary">Try the Playground</a>
            <a href="{{ site.baseurl }}/implementations/" class="btn btn-secondary">Browse Implementations</a>
            <a href="{{ site.github_repo }}" class="btn btn-primary" target="_blank" rel="noopener">View on GitHub</a>
        </div>
    </div>
</section>