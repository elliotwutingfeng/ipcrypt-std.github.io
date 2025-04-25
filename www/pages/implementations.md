---
layout: page
title: IPCrypt Implementations
description: Explore the various implementations of IPCrypt across different programming languages, including Python, C, Rust, JavaScript, Go, Zig, PHP, and D.
permalink: /implementations/
---

# IPCrypt Implementations

IPCrypt has been implemented in multiple programming languages to ensure broad accessibility and ease of integration across different platforms and environments. Each implementation follows the specification and provides the same cryptographic guarantees.

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