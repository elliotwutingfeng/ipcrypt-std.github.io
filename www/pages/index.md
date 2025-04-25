---
layout: default
title: IPCrypt - IP Address Encryption and Obfuscation
description: Proposed methods for encrypting and obfuscating IP addresses, providing both deterministic format-preserving and non-deterministic constructions, with implementations in Python, C, Rust, JavaScript, Go, Zig, PHP, and D.
permalink: /
---

<section class="hero">
    <div class="container mx-auto px-4 py-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">A Community Approach to IP Address Encryption</h1>
        <p class="text-xl max-w-3xl mx-auto mb-8">
            IPCrypt is a free, open specification created by volunteers to help encrypt and obfuscate IP addresses, balancing privacy considerations with practical network operations.
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
                IPCrypt is a community-created specification that suggests methods for encrypting and obfuscating IP addresses. It aims to help network operators, researchers, and privacy advocates share or analyze data while considering address privacy.
            </p>
            <p class="text-lg mb-6">
                The specification offers both deterministic format-preserving and non-deterministic approaches that work with both IPv4 and IPv6 addresses.
            </p>
            <p class="text-lg mb-6">
                <strong>Simplicity</strong> is a core value in IPCrypt's design. Rather than trying to create new cryptographic methods, we've used established standards that are well-understood and widely available, making it easier for anyone to implement.
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
        <h2 class="text-3xl font-bold mb-6 text-center">A Community Approach</h2>
        <div class="max-w-3xl mx-auto">
            <p class="text-lg mb-6">
                IPCrypt is a <strong>volunteer-created specification</strong> that tries to be practical and easy to implement. We've focused on clarity and simplicity so that anyone can understand and use it, regardless of their resources or expertise.
            </p>
            <p class="text-lg mb-6">
                We've built on existing, well-tested cryptographic methods rather than creating new ones. Our goal is to provide a helpful resource that can be freely implemented in any programming language or environment.
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
        <h2 class="text-3xl font-bold mb-6 text-center">Community Implementations</h2>
        <div class="max-w-4xl mx-auto">
            <div class="card">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                        <h3 class="text-xl font-bold mb-3">Freely Available in Several Programming Languages</h3>
                        <p class="mb-4">
                            Thanks to community contributors, IPCrypt has been implemented in Python, C, Rust, JavaScript, Go, Zig, PHP, D, and more, making it accessible to developers across different platforms.
                        </p>
                        <p class="mb-6">
                            Each implementation is open source and follows the same specification, allowing developers to choose the language that best fits their project.
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
        <h2 class="text-3xl font-bold mb-6">Join the Community</h2>
        <p class="text-lg max-w-3xl mx-auto mb-8">
            Interested in using or contributing to IPCrypt? Explore our resources, try the interactive playground, or check out the open source implementations. All are freely available for anyone to use.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="https://jedisct1.github.io/draft-denis-ipcrypt/draft-denis-ipcrypt.html" class="btn btn-secondary" target="_blank" rel="noopener">Read the Specification</a>
            <a href="{{ site.baseurl }}/playground/" class="btn btn-primary">Try the Playground</a>
            <a href="{{ site.baseurl }}/implementations/" class="btn btn-secondary">Browse Implementations</a>
            <a href="{{ site.github_repo }}" class="btn btn-primary" target="_blank" rel="noopener">View on GitHub</a>
        </div>
    </div>
</section>