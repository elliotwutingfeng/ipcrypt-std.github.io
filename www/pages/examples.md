---
layout: page
title: IPCrypt Examples
description: Interactive examples and demonstrations of IPCrypt encryption modes and use cases.
permalink: /examples/
---

## IPCrypt Examples

This page provides interactive examples and demonstrations of IPCrypt in action. You can explore the different encryption modes, see how they work, and understand their practical applications.

## Interactive Playground

Try IPCrypt directly in your browser with our interactive playground:

<div class="card p-6 mb-8">
    <h3 class="text-xl font-bold mb-4">IPCrypt Playground</h3>
    <p class="mb-4">Experiment with different encryption modes and see the results in real-time.</p>
    <a href="/examples/playground/" class="btn btn-primary">Open Playground</a>
</div>

## Encryption Modes Comparison

The following examples demonstrate the four encryption modes of IPCrypt:

### Deterministic Encryption (ipcrypt-deterministic)

<div class="example-card p-6 border rounded-lg mb-6">
    <h3 class="text-xl font-bold mb-3">ipcrypt-deterministic</h3>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <h4 class="font-bold mb-2">Input</h4>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">IP Address:</div>
                <div class="p-2 bg-gray-100 rounded font-mono">192.0.2.1</div>
            </div>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">Key (Hex):</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">2b7e151628aed2a6abf7158809cf4f3c</div>
            </div>
        </div>
        
        <div>
            <h4 class="font-bold mb-2">Output</h4>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">Encrypted IP:</div>
                <div class="p-2 bg-gray-100 rounded font-mono">1dbd:c1b9:fff1:7586:7d0b:67b4:e76e:4777</div>
            </div>
            <div>
                <div class="text-sm font-medium text-gray-500 mb-1">Hex Representation:</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">1dbdc1b9fff175867d0b67b4e76e4777</div>
            </div>
        </div>
    </div>
    
    <div class="mt-4">
        <div class="text-sm font-medium text-gray-500 mb-1">Key Characteristics:</div>
        <ul class="list-disc ml-6">
            <li>Same input always produces the same output with the same key</li>
            <li>Format-preserving (output is a valid IP address)</li>
            <li>Reveals patterns in the data (repeated inputs have identical outputs)</li>
            <li>16-byte output (same size as input)</li>
        </ul>
    </div>
</div>

### Non-Deterministic Encryption (ipcrypt-nd)

<div class="example-card p-6 border rounded-lg mb-6">
    <h3 class="text-xl font-bold mb-3">ipcrypt-nd</h3>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <h4 class="font-bold mb-2">Input</h4>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">IP Address:</div>
                <div class="p-2 bg-gray-100 rounded font-mono">192.0.2.1</div>
            </div>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">Key (Hex):</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">1032547698badcfeefcdab8967452301</div>
            </div>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">Tweak (Hex):</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">21bd1834bc088cd2</div>
            </div>
        </div>
        
        <div>
            <h4 class="font-bold mb-2">Output</h4>
            <div>
                <div class="text-sm font-medium text-gray-500 mb-1">Encrypted Output (Hex):</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">21bd1834bc088cd2e5e1fe55f95876e639faae2594a0caad</div>
            </div>
        </div>
    </div>
    
    <div class="mt-4">
        <div class="text-sm font-medium text-gray-500 mb-1">Key Characteristics:</div>
        <ul class="list-disc ml-6">
            <li>Same input produces different outputs due to random tweak</li>
            <li>Not format-preserving (output is larger than a standard IP address)</li>
            <li>Hides patterns in the data (repeated inputs have different outputs)</li>
            <li>24-byte output (8-byte tweak + 16-byte ciphertext)</li>
            <li>Uses KIASU-BC tweakable block cipher</li>
        </ul>
    </div>
</div>

### Non-Deterministic Extended Encryption (ipcrypt-ndx)

<div class="example-card p-6 border rounded-lg mb-6">
    <h3 class="text-xl font-bold mb-3">ipcrypt-ndx</h3>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <h4 class="font-bold mb-2">Input</h4>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">IP Address:</div>
                <div class="p-2 bg-gray-100 rounded font-mono">2001:db8::1</div>
            </div>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">Key (Hex):</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">2b7e151628aed2a6abf7158809cf4f3c3c4fcf098815f7aba6d2ae2816157e2b</div>
            </div>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">Tweak (Hex):</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">21bd1834bc088cd2b4ecbe30b70898d7</div>
            </div>
        </div>
        
        <div>
            <h4 class="font-bold mb-2">Output</h4>
            <div>
                <div class="text-sm font-medium text-gray-500 mb-1">Encrypted Output (Hex):</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">21bd1834bc088cd2b4ecbe30b70898d76089c7e05ae30c2d10ca149870a263e4</div>
            </div>
        </div>
    </div>
    
    <div class="mt-4">
        <div class="text-sm font-medium text-gray-500 mb-1">Key Characteristics:</div>
        <ul class="list-disc ml-6">
            <li>Same input produces different outputs due to random tweak</li>
            <li>Not format-preserving (output is larger than a standard IP address)</li>
            <li>Hides patterns in the data (repeated inputs have different outputs)</li>
            <li>32-byte output (16-byte tweak + 16-byte ciphertext)</li>
            <li>Uses AES-XTS tweakable block cipher</li>
            <li>Highest security margin with 128-bit tweak space</li>
        </ul>
    </div>
</div>

### Prefix-Preserving Encryption (ipcrypt-pfx)

<div class="example-card p-6 border rounded-lg mb-6">
    <h3 class="text-xl font-bold mb-3">ipcrypt-pfx</h3>
    
    <div class="grid md:grid-cols-2 gap-4">
        <div>
            <h4 class="font-bold mb-2">Input</h4>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">IP Addresses (Same /24 network):</div>
                <div class="p-2 bg-gray-100 rounded font-mono">10.0.0.47</div>
                <div class="p-2 bg-gray-100 rounded font-mono mt-1">10.0.0.129</div>
                <div class="p-2 bg-gray-100 rounded font-mono mt-1">10.0.0.234</div>
            </div>
            <div class="mb-4">
                <div class="text-sm font-medium text-gray-500 mb-1">Key (Hex):</div>
                <div class="p-2 bg-gray-100 rounded font-mono break-all">2b7e151628aed2a6abf7158809cf4f3ca9f5ba40db214c3798f2e1c23456789a</div>
            </div>
        </div>
        
        <div>
            <h4 class="font-bold mb-2">Output</h4>
            <div>
                <div class="text-sm font-medium text-gray-500 mb-1">Encrypted IPs (Same encrypted /24 prefix):</div>
                <div class="p-2 bg-gray-100 rounded font-mono">19.214.210.244</div>
                <div class="p-2 bg-gray-100 rounded font-mono mt-1">19.214.210.80</div>
                <div class="p-2 bg-gray-100 rounded font-mono mt-1">19.214.210.30</div>
                <div class="text-xs text-gray-600 mt-2">Note: All three share the encrypted prefix 19.214.210.x</div>
            </div>
        </div>
    </div>
    
    <div class="mt-4">
        <div class="text-sm font-medium text-gray-500 mb-1">Key Characteristics:</div>
        <ul class="list-disc ml-6">
            <li>Preserves network structure - addresses from same subnet share encrypted prefixes</li>
            <li>Maintains native IP address sizes (4 bytes for IPv4, 16 bytes for IPv6)</li>
            <li>Enables network-level analytics while protecting actual network identities</li>
            <li>Deterministic - same input always produces same output with same key</li>
            <li>Uses 32-byte key for enhanced security</li>
        </ul>
    </div>
</div>

## Use Case Examples

The following examples demonstrate practical applications of IPCrypt:

### Privacy-Preserving Logging

<div class="example-card p-6 border rounded-lg mb-6">
    <h3 class="text-xl font-bold mb-3">Web Server Logging</h3>
    
    <div class="mb-4">
        <h4 class="font-bold mb-2">Traditional Log Format (Privacy Risk)</h4>
        <pre class="p-3 bg-gray-100 rounded overflow-x-auto text-sm">
192.0.2.1 - - [24/Apr/2025:10:15:32 +0100] "GET /index.html HTTP/1.1" 200 2326
198.51.100.17 - - [24/Apr/2025:10:15:33 +0100] "GET /style.css HTTP/1.1" 200 1128
203.0.113.42 - - [24/Apr/2025:10:15:35 +0100] "POST /login HTTP/1.1" 302 0
192.0.2.1 - - [24/Apr/2025:10:16:12 +0100] "GET /profile HTTP/1.1" 200 4582
        </pre>
    </div>
    
    <div class="mb-4">
        <h4 class="font-bold mb-2">IPCrypt-Protected Log Format</h4>
        <pre class="p-3 bg-gray-100 rounded overflow-x-auto text-sm">
1dbd:c1b9:fff1:7586:7d0b:67b4:e76e:4777 - - [24/Apr/2025:10:15:32 +0100] "GET /index.html HTTP/1.1" 200 2326
a3f5:e7c2:b918:d46a:5e2f:c0d3:8b7a:1f9e - - [24/Apr/2025:10:15:33 +0100] "GET /style.css HTTP/1.1" 200 1128
6b9d:4f2e:8a7c:1d5b:3f9e:2c8d:7a6b:5e4d - - [24/Apr/2025:10:15:35 +0100] "POST /login HTTP/1.1" 302 0
1dbd:c1b9:fff1:7586:7d0b:67b4:e76e:4777 - - [24/Apr/2025:10:16:12 +0100] "GET /profile HTTP/1.1" 200 4582
        </pre>
    </div>
    
    <div class="mt-4">
        <div class="text-sm font-medium text-gray-500 mb-1">Benefits:</div>
        <ul class="list-disc ml-6">
            <li>IP addresses are encrypted, protecting user privacy</li>
            <li>Format preservation allows existing log analysis tools to work</li>
            <li>Deterministic encryption enables tracking user sessions and unique visitor counts</li>
            <li>Original IP addresses are not stored, reducing compliance burden</li>
        </ul>
    </div>
</div>

### Rate Limiting with Encrypted IPs

<div class="example-card p-6 border rounded-lg mb-6">
    <h3 class="text-xl font-bold mb-3">API Rate Limiting</h3>
    
    <div class="mb-4">
        <h4 class="font-bold mb-2">Implementation Example (Python)</h4>
        <pre class="p-3 bg-gray-100 rounded overflow-x-auto text-sm">
from ipcrypt import IPCrypt
from flask import Flask, request, jsonify
import time

app = Flask(__name__)

# Initialize IPCrypt with a secure key
key = bytes.fromhex("2b7e151628aed2a6abf7158809cf4f3c")
ipcrypt = IPCrypt(key)

# Simple in-memory rate limiter
rate_limits = {}  # Maps encrypted IPs to (count, reset_time)
RATE_LIMIT = 10   # Requests per minute

@app.route('/api/data')
def get_data():
    # Get client IP
    client_ip = request.remote_addr
    
    # Encrypt the IP (deterministic mode)
    encrypted_ip = ipcrypt.encrypt_deterministic(client_ip)
    
    # Check rate limit
    current_time = time.time()
    if encrypted_ip in rate_limits:
        count, reset_time = rate_limits[encrypted_ip]
        
        # Reset counter if minute has passed
        if current_time > reset_time:
            rate_limits[encrypted_ip] = (1, current_time + 60)
        # Increment counter if under limit
        elif count < RATE_LIMIT:
            rate_limits[encrypted_ip] = (count + 1, reset_time)
        # Reject if over limit
        else:
            return jsonify({"error": "Rate limit exceeded"}), 429
    else:
        # First request from this IP
        rate_limits[encrypted_ip] = (1, current_time + 60)
    
    # Process the request
    return jsonify({"data": "API response"})
        </pre>
    </div>
    
    <div class="mt-4">
        <div class="text-sm font-medium text-gray-500 mb-1">Benefits:</div>
        <ul class="list-disc ml-6">
            <li>Rate limiting works without storing actual IP addresses</li>
            <li>Privacy is preserved while maintaining security controls</li>
            <li>Deterministic encryption ensures consistent identification</li>
            <li>Implementation is simple and requires minimal changes to existing code</li>
        </ul>
    </div>
</div>

### Third-Party Data Sharing

<div class="example-card p-6 border rounded-lg mb-6">
    <h3 class="text-xl font-bold mb-3">Secure Analytics Integration</h3>
    
    <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div>
            <h4 class="font-bold mb-2">Original Data (Privacy Risk)</h4>
            <pre class="p-3 bg-gray-100 rounded overflow-x-auto text-sm">
{
  "events": [
    {
      "timestamp": "2025-04-24T10:15:32Z",
      "ip": "192.0.2.1",
      "user_agent": "Mozilla/5.0...",
      "page": "/products",
      "action": "view"
    },
    {
      "timestamp": "2025-04-24T10:16:45Z",
      "ip": "192.0.2.1",
      "user_agent": "Mozilla/5.0...",
      "page": "/products/123",
      "action": "add_to_cart"
    }
  ]
}
            </pre>
        </div>
        
        <div>
            <h4 class="font-bold mb-2">IPCrypt-Protected Data</h4>
            <pre class="p-3 bg-gray-100 rounded overflow-x-auto text-sm">
{
  "events": [
    {
      "timestamp": "2025-04-24T10:15:32Z",
      "encrypted_ip": "08e0c289bff23b7cb349aadfe3bcef56221c384c7c217b16",
      "user_agent": "Mozilla/5.0...",
      "page": "/products",
      "action": "view"
    },
    {
      "timestamp": "2025-04-24T10:16:45Z",
      "encrypted_ip": "21bd1834bc088cd2e5e1fe55f95876e639faae2594a0caad",
      "user_agent": "Mozilla/5.0...",
      "page": "/products/123",
      "action": "add_to_cart"
    }
  ]
}
            </pre>
        </div>
    </div>
    
    <div class="mt-4">
        <div class="text-sm font-medium text-gray-500 mb-1">Benefits:</div>
        <ul class="list-disc ml-6">
            <li>Non-deterministic encryption prevents correlation across different data sets</li>
            <li>Third-party analytics provider cannot recover original IP addresses</li>
            <li>Analytics on user journeys still possible by including session identifiers</li>
            <li>Reduces privacy and compliance risks when sharing data</li>
        </ul>
    </div>
</div>

## Try It Yourself

Ready to implement IPCrypt in your own project? Check out our [developer resources](/resources/) for guides, examples, and best practices.

For a hands-on experience, visit the [interactive playground](/playground/) to experiment with different encryption modes and parameters.