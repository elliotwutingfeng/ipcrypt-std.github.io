---
layout: default
title: IPCrypt - IP Address Encryption and Obfuscation
description: Methods for encrypting and obfuscating IP addresses, providing both deterministic format-preserving and non-deterministic constructions.
permalink: /
---

<section class="hero">
    <div class="container mx-auto px-4 py-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">A Common Approach to IP Address Encryption</h1>
        <p class="text-xl max-w-3xl mx-auto mb-8">
            IPCrypt is a simple, open specification for encrypting and obfuscating IP addresses, balancing privacy considerations with practical network operations.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
            <a href="{{ site.baseurl }}/about/" class="btn btn-primary">Learn More</a>
            <a href="https://datatracker.ietf.org/doc/draft-denis-ipcrypt/" class="btn btn-secondary" target="_blank" rel="noopener">Read the Specification</a>
            <a href="https://eprint.iacr.org/2025/1689" class="btn btn-secondary" target="_blank" rel="noopener">Read the Paper</a>
            <a href="{{ site.baseurl }}/playground/" class="btn btn-accent">Try the Playground</a>
        </div>
    </div>
</section>

<section class="py-12 bg-white">
    <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold mb-6 text-center">What is IPCrypt?</h2>
            <p class="text-lg mb-6">
                IPCrypt is a simple, open specification that defines methods for encrypting and obfuscating IP addresses. It offers both deterministic format-preserving and non-deterministic approaches that work with both IPv4 and IPv6 addresses.
            </p>
            <p class="text-lg mb-6">
                Unlike truncation that destroys data irreversibly and hashing that cannot be reversed, IPCrypt provides cryptographically secure, reversible encryption designed for high-performance processing at network speeds.
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
                    Prevent exposure of sensitive user information to third parties without key access, addressing data minimization concerns from RFC6973.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Format Preservation</h3>
                <p>
                    Deterministic mode produces valid IP addresses, enabling encrypted addresses to flow through existing infrastructure without modification.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Correlation Protection</h3>
                <p>
                    Non-deterministic modes use random tweaks to produce different ciphertexts for the same IP, preventing pattern analysis.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Privacy-Preserving Analytics</h3>
                <p>
                    Count unique clients, implement rate limiting, and perform deduplication directly on encrypted addresses without revealing original values.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">Seamless Integration</h3>
                <p>
                    Use encrypted IPs as privacy-preserving identifiers when interacting with untrusted services, cloud providers, or external platforms.
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="text-xl font-bold mb-3">High Performance</h3>
                <p>
                    All variants operate on exactly 128 bits, achieving single-block encryption speed critical for network-rate processing.
                </p>
            </div>
        </div>
    </div>
</section>

<section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">See IPCrypt in Action</h2>
        <p class="text-lg text-center max-w-3xl mx-auto mb-12">
            Each mode offers different privacy and operational characteristics. See how the same IP addresses transform:
        </p>
        
        <div class="examples-grid">
            <!-- ipcrypt-deterministic -->
            <div class="example-card">
                <div class="example-header">
                    <h3>ipcrypt-deterministic</h3>
                    <span class="badge badge-blue">Format-preserving</span>
                </div>
                <p class="example-description">Valid IP addresses, same input always produces same output</p>
                <div class="example-samples">
                    <div class="sample">
                        <span class="input">192.168.1.1</span>
                        <span class="arrow">→</span>
                        <span class="output">d1e9:518:d5bc:4487:51c6:c51f:44ed:e9f6</span>
                    </div>
                    <div class="sample highlight-same">
                        <span class="input">192.168.1.254</span>
                        <span class="arrow">→</span>
                        <span class="output">fd7e:f70f:44d7:cdb2:2992:95a1:e692:7696</span>
                    </div>
                    <div class="sample highlight-same">
                        <span class="input">192.168.1.254</span>
                        <span class="arrow">→</span>
                        <span class="output">fd7e:f70f:44d7:cdb2:2992:95a1:e692:7696</span>
                        <span class="indicator">✓ Same</span>
                    </div>
                </div>
            </div>

            <!-- ipcrypt-pfx -->
            <div class="example-card">
                <div class="example-header">
                    <h3>ipcrypt-pfx</h3>
                    <span class="badge badge-green">Prefix-preserving</span>
                </div>
                <p class="example-description">Maintains network structure, same prefix when IPs share prefix</p>
                <div class="example-samples">
                    <div class="sample highlight-prefix">
                        <span class="input">192.168.1.1</span>
                        <span class="arrow">→</span>
                        <span class="output"><em>251.81.131</em>.124</span>
                    </div>
                    <div class="sample highlight-prefix">
                        <span class="input">192.168.1.254</span>
                        <span class="arrow">→</span>
                        <span class="output"><em>251.81.131</em>.159</span>
                        <span class="indicator">✓ Prefix</span>
                    </div>
                    <div class="sample">
                        <span class="input">172.16.69.42</span>
                        <span class="arrow">→</span>
                        <span class="output">165.228.146.177</span>
                    </div>
                </div>
            </div>

            <!-- ipcrypt-nd -->
            <div class="example-card">
                <div class="example-header">
                    <h3>ipcrypt-nd</h3>
                    <span class="badge badge-purple">Non-deterministic</span>
                </div>
                <p class="example-description">Compact 24-byte output, different each time</p>
                <div class="example-samples">
                    <div class="sample">
                        <span class="input">192.168.1.1</span>
                        <span class="arrow">→</span>
                        <span class="output hex">f0ea0bbd...03aa9fcb</span>
                    </div>
                    <div class="sample highlight-different">
                        <span class="input">192.168.1.254</span>
                        <span class="arrow">→</span>
                        <span class="output hex">620b58d8...2ff8086f</span>
                    </div>
                    <div class="sample highlight-different">
                        <span class="input">192.168.1.254</span>
                        <span class="arrow">→</span>
                        <span class="output hex">35fc2338...25abed5d</span>
                        <span class="indicator">≠ Different</span>
                    </div>
                </div>
            </div>

            <!-- ipcrypt-ndx -->
            <div class="example-card">
                <div class="example-header">
                    <h3>ipcrypt-ndx</h3>
                    <span class="badge badge-orange">Extended non-deterministic</span>
                </div>
                <p class="example-description">32-byte output, unlimited operations per key</p>
                <div class="example-samples">
                    <div class="sample">
                        <span class="input">192.168.1.1</span>
                        <span class="arrow">→</span>
                        <span class="output hex">5862dc6d...ddb3693f</span>
                    </div>
                    <div class="sample highlight-different">
                        <span class="input">192.168.1.254</span>
                        <span class="arrow">→</span>
                        <span class="output hex">e697ca59...e5c41875</span>
                    </div>
                    <div class="sample highlight-different">
                        <span class="input">192.168.1.254</span>
                        <span class="arrow">→</span>
                        <span class="output hex">9b11a0aa...39de0a77</span>
                        <span class="indicator">≠ Different</span>
                    </div>
                </div>
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
                        <h3 class="text-xl font-bold mb-3">Freely Available in Many Programming Languages</h3>
                        <p class="mb-4">
                            IPCrypt has been implemented in Python, C, Rust, JavaScript, Go, Java, Lua, Swift, Elixir, Ruby, Kotlin, AWK, Dart, Zig, PHP, D, and more, making it accessible to developers across different platforms.
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
                            <span class="language-badge">Java</span>
                            <span class="language-badge">Lua</span>
                            <span class="language-badge">Swift</span>
                            <span class="language-badge">Elixir</span>
                            <span class="language-badge">Ruby</span>
                            <span class="language-badge">Kotlin</span>
                            <span class="language-badge">AWK</span>
                            <span class="language-badge">Dart</span>
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
                            The playground uses the JavaScript implementation of IPCrypt, allowing you to test all four encryption modes with both IPv4 and IPv6 addresses.
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
            <a href="https://datatracker.ietf.org/doc/draft-denis-ipcrypt/" class="btn btn-secondary" target="_blank" rel="noopener">Read the Specification</a>
            <a href="{{ site.baseurl }}/playground/" class="btn btn-primary">Try the Playground</a>
            <a href="{{ site.baseurl }}/implementations/" class="btn btn-secondary">Browse Implementations</a>
            <a href="{{ site.github_repo }}" class="btn btn-primary" target="_blank" rel="noopener">View on GitHub</a>
        </div>
    </div>
</section>
