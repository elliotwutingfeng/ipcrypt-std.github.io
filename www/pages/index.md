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

<section class="py-12 bg-white">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">A Common Approach</h2>
        <div class="max-w-3xl mx-auto">
            <p class="text-lg mb-6">
                IPCrypt is a <strong>simple, open specification</strong> that tries to be practical and easy to implement. We've focused on clarity and simplicity so that anyone can understand and use it, regardless of their resources or expertise.
            </p>
            <p class="text-lg mb-6">
                We've built on existing, well-tested cryptographic methods rather than creating new ones. Our goal is to provide a helpful resource that can be freely implemented in any programming language or environment.
            </p>
        </div>
    </div>
</section>

<section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">See IPCrypt in Action</h2>
        <p class="text-lg text-center max-w-3xl mx-auto mb-12">
            Each mode offers different privacy and operational characteristics. See how the same IP addresses transform with each encryption method:
        </p>
        
        <div class="examples-showcase">
            <!-- ipcrypt-deterministic -->
            <div class="example-mode">
                <div class="mode-header">
                    <h3 class="text-2xl font-bold mb-2">ipcrypt-deterministic</h3>
                    <p class="text-gray-600 mb-4">Deterministic encryption. Ciphertexts are valid IP addresses revealing nothing about the actual IP address without knowledge of the key.</p>
                </div>
                <div class="example-box">
                    <div class="key-display">
                        <span class="key-label">Key:</span>
                        <code class="key-value">8c93f2dbd0d235837d9dd312fb4a4df8</code>
                    </div>
                    <div class="transformations">
                        <div class="transform-row">
                            <code class="ip-input">192.168.1.1</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">d1e9:518:d5bc:4487:51c6:c51f:44ed:e9f6</code>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input">192.168.1.254</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">fd7e:f70f:44d7:cdb2:2992:95a1:e692:7696</code>
                        </div>
                        <div class="transform-row highlight-duplicate">
                            <code class="ip-input">192.168.1.254</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">fd7e:f70f:44d7:cdb2:2992:95a1:e692:7696</code>
                            <span class="note">Same output for same input</span>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input">172.16.69.42</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">ce87:6e8e:6183:e8:971f:834b:ae41:cc14</code>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input ipv6">ff85:7421:b9c2:eeb6:1b04:be58:e900:6efa</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">100.87.132.219</code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ipcrypt-pfx -->
            <div class="example-mode">
                <div class="mode-header">
                    <h3 class="text-2xl font-bold mb-2">ipcrypt-pfx</h3>
                    <p class="text-gray-600 mb-4">Prefix-preserving encryption. Ciphertexts are valid IP addresses sharing the same prefix when real IP addresses share the same prefix.</p>
                </div>
                <div class="example-box">
                    <div class="key-display">
                        <span class="key-label">Key:</span>
                        <code class="key-value">8c93f2dbd0d235837d9dd312fb4a4df8d64bd614e4c392d4a61e61888a903587</code>
                    </div>
                    <div class="transformations">
                        <div class="transform-row highlight-prefix">
                            <code class="ip-input">192.168.1.1</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">251.81.131.124</code>
                        </div>
                        <div class="transform-row highlight-prefix">
                            <code class="ip-input">192.168.1.254</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">251.81.131.159</code>
                            <span class="note">Same prefix preserved</span>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input">192.168.1.254</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">251.81.131.159</code>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input">172.16.69.42</code>
                            <span class="arrow">→</span>
                            <code class="ip-output">165.228.146.177</code>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input ipv6">ff85:7421:b9c2:eeb6:1b04:be58:e900:6efa</code>
                            <span class="arrow">→</span>
                            <code class="ip-output ipv6">2f68:6ffb:7f62:6839:fe25:d903:244f:1426</code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ipcrypt-nd -->
            <div class="example-mode">
                <div class="mode-header">
                    <h3 class="text-2xl font-bold mb-2">ipcrypt-nd</h3>
                    <p class="text-gray-600 mb-4">Compact, efficient non-deterministic encryption. Hides repetition of IP addresses.</p>
                </div>
                <div class="example-box">
                    <div class="key-display">
                        <span class="key-label">Key:</span>
                        <code class="key-value">8c93f2dbd0d235837d9dd312fb4a4df8</code>
                    </div>
                    <div class="transformations">
                        <div class="transform-row">
                            <code class="ip-input">192.168.1.1</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">f0ea0bbde9e2526c57d70c9a25da283943c5da2f03aa9fcb</code>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input">192.168.1.254</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">620b58d8e0c702670c3030f5ef68817f4c2df9bb2ff8086f</code>
                        </div>
                        <div class="transform-row highlight-different">
                            <code class="ip-input">192.168.1.254</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">35fc2338902a7e716d11136959ad98be9ca2943d25abed5d</code>
                            <span class="note">Different output each time</span>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input">172.16.69.42</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">6054d153f856bcc0b45c12ea1ea34cefdb8bb3434fed9335</code>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input ipv6">ff85:7421:b9c2:eeb6:1b04:be58:e900:6efa</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">62fe98d3df434a614165e65c0f0d02d7f179ffbeaa4ed712</code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ipcrypt-ndx -->
            <div class="example-mode">
                <div class="mode-header">
                    <h3 class="text-2xl font-bold mb-2">ipcrypt-ndx</h3>
                    <p class="text-gray-600 mb-4">Non-deterministic encryption with no practical usage limits. Hides repetition of IP addresses.</p>
                </div>
                <div class="example-box">
                    <div class="key-display">
                        <span class="key-label">Key:</span>
                        <code class="key-value">8c93f2dbd0d235837d9dd312fb4a4df8d64bd614e4c392d4a61e61888a903587</code>
                    </div>
                    <div class="transformations">
                        <div class="transform-row">
                            <code class="ip-input">192.168.1.1</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">5862dc6ddc1a56f98930a7d60d56a207f7b38c15886a8162a52b5a10ddb3693f</code>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input">192.168.1.254</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">e697ca59da82682736108016c00a34cc205c51b5af0b7f652144604ae5c41875</code>
                        </div>
                        <div class="transform-row highlight-different">
                            <code class="ip-input">192.168.1.254</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">9b11a0aa36bc48f7dc0fe123eeed5730c7e3a9e2fcecfa16fecd252239de0a77</code>
                            <span class="note">Different output each time</span>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input">172.16.69.42</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">0186684f5c6c1cf60785cb2a21b31fd3ccc3ba3009ddad595b9aa82ef1180b9b</code>
                        </div>
                        <div class="transform-row">
                            <code class="ip-input ipv6">ff85:7421:b9c2:eeb6:1b04:be58:e900:6efa</code>
                            <span class="arrow">→</span>
                            <code class="ip-output hex">8aedb00f89d0b23691770569fff6677518e64f2bfa390d87edf75beeeefeebb4</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-12">
            <p class="text-lg mb-6">Want to try it yourself with your own IP addresses and keys?</p>
            <a href="{{ site.baseurl }}/playground/" class="btn btn-primary">Try the Interactive Playground</a>
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
