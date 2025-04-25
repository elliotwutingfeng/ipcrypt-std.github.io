---
layout: page
title: IPCrypt Developer Resources
description: Resources for developers implementing and using IPCrypt, including guides, examples, and best practices.
permalink: /resources/
---

## Developer Resources

This page provides resources for developers who want to implement or use IPCrypt in their projects. Whether you're integrating an existing implementation or creating a new one, these resources will help you understand and effectively use IPCrypt.

## Getting Started

### Understanding IPCrypt

Before implementing or using IPCrypt, it's important to understand its core concepts:

1. **Read the [About IPCrypt]({{ site.baseurl }}/about/) page** for an overview of the project and its goals
2. **Review the [Specification](https://jedisct1.github.io/draft-denis-ipcrypt/draft-denis-ipcrypt.html){:target="_blank" rel="noopener"}** for detailed technical information
3. **Explore the [Implementations]({{ site.baseurl }}/implementations/)** to find a version that suits your needs

### Quick Start Guide

To quickly get started with IPCrypt:

1. **Choose an implementation** in your preferred programming language
2. **Install the library** following the implementation-specific instructions
3. **Generate a cryptographic key** (16 bytes for deterministic/nd modes, 32 bytes for ndx mode)
4. **Encrypt IP addresses** using one of the three available modes
5. **Store or transmit** the encrypted addresses as needed

## Implementation Guide

### Choosing an Encryption Mode

IPCrypt offers three encryption modes, each with different characteristics:

| Mode                    | Format Preservation | Correlation Protection | Output Size | Use Case                                                            |
| ----------------------- | ------------------- | ---------------------- | ----------- | ------------------------------------------------------------------- |
| `ipcrypt-deterministic` | Yes                 | No                     | 16 bytes    | When format preservation is required and correlation is acceptable  |
| `ipcrypt-nd`            | No                  | Yes                    | 24 bytes    | When correlation protection is needed with moderate security margin |
| `ipcrypt-ndx`           | No                  | Yes                    | 32 bytes    | When maximum security margin is required                            |

### Key Management

Proper key management is essential for the security of IPCrypt:

- **Key Generation**: Use a cryptographically secure random number generator
- **Key Storage**: Store keys securely, preferably in a key management system
- **Key Rotation**: Rotate keys periodically to limit the impact of potential compromises
- **Key Separation**: Use different keys for different applications or data sets

### Best Practices

When implementing IPCrypt, follow these best practices:

1. **Validate Inputs**: Ensure IP addresses are properly formatted before encryption
2. **Handle Errors Gracefully**: Implement proper error handling for invalid inputs
3. **Use Constant-Time Operations**: Prevent timing attacks in security-critical applications
4. **Test Against Vectors**: Verify your implementation against the provided test vectors
5. **Document Usage**: Clearly document which encryption mode and key is used for each application

## Integration Examples

### Logging Integration

Integrate IPCrypt into your logging system to protect user privacy:

```python
from ipcrypt import IPCrypt

# Initialize with a secure key
key = bytes.fromhex("0123456789abcdeffedcba9876543210")
ipcrypt = IPCrypt(key)

def log_request(client_ip, request_path, status_code):
    # Encrypt the client IP address
    encrypted_ip = ipcrypt.encrypt_deterministic(client_ip)
    
    # Log with the encrypted IP
    logger.info(f"Request from {encrypted_ip} to {request_path} returned {status_code}")
```

### Analytics Integration

Use IPCrypt for privacy-preserving analytics:

```javascript
const { IPCrypt } = require('ipcrypt');

// Initialize with a secure key
const key = Buffer.from('0123456789abcdeffedcba9876543210', 'hex');
const ipcrypt = new IPCrypt(key);

function trackVisitor(clientIp) {
  // Encrypt the client IP address
  const encryptedIp = ipcrypt.encryptDeterministic(clientIp);
  
  // Use the encrypted IP as a unique identifier
  analytics.trackVisitor({
    visitorId: encryptedIp,
    // other analytics data...
  });
}
```

### Rate Limiting Example

Implement rate limiting with encrypted IP addresses:

```go
import (
    "github.com/jedisct1/go-ipcrypt"
    "golang.org/x/time/rate"
)

// Create a map of rate limiters keyed by encrypted IP
var limiters = make(map[string]*rate.Limiter)

// Initialize IPCrypt with a secure key
key, _ := hex.DecodeString("0123456789abcdeffedcba9876543210")
ipc, _ := ipcrypt.New(key)

func rateLimit(clientIP string) bool {
    // Encrypt the client IP
    encryptedIP, _ := ipc.EncryptDeterministic(clientIP)
    
    // Get or create a rate limiter for this encrypted IP
    limiter, exists := limiters[encryptedIP]
    if !exists {
        // Create a new rate limiter: 10 requests per minute
        limiter = rate.NewLimiter(rate.Limit(10/60), 10)
        limiters[encryptedIP] = limiter
    }
    
    // Check if the request is allowed
    return limiter.Allow()
}
```

## Common Patterns

### Storing Encrypted IPs in Databases

When storing encrypted IP addresses in databases:

1. **Deterministic Mode**: Use for searchable encryption where you need to query by IP
2. **Non-Deterministic Mode**: Use when correlation protection is more important than searchability
3. **Index Both**: For maximum flexibility, store both deterministic and non-deterministic versions

Example schema:

```sql
CREATE TABLE access_logs (
    id SERIAL PRIMARY KEY,
    encrypted_ip_deterministic VARCHAR(39) NOT NULL, -- For searching
    encrypted_ip_nd TEXT NOT NULL,                   -- For maximum privacy
    timestamp TIMESTAMP NOT NULL,
    resource_path TEXT NOT NULL,
    status_code INTEGER NOT NULL
);

-- Create an index on the deterministic version for efficient queries
CREATE INDEX idx_access_logs_ip ON access_logs(encrypted_ip_deterministic);
```

### Sharing Data with Third Parties

When sharing data with third parties:

1. **Use Non-Deterministic Encryption**: Prevents correlation across different data sets
2. **Include Only Necessary Data**: Share only the minimum required information
3. **Document Encryption Method**: Clearly document that IP addresses are encrypted
4. **Consider Re-Encryption**: For maximum security, re-encrypt with a different key before sharing

## Troubleshooting

### Common Issues

| Issue                                    | Possible Cause                    | Solution                                                            |
| ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------- |
| Invalid IP format                        | Malformed input IP address        | Validate IP addresses before encryption                             |
| Incorrect output format                  | Byte order or encoding issues     | Ensure proper byte order and encoding/decoding                      |
| Decryption failure                       | Wrong key or corrupted ciphertext | Verify key and ciphertext integrity                                 |
| Performance issues                       | Inefficient implementation        | Use optimized implementations for performance-critical applications |
| Different results across implementations | Implementation bugs               | Verify against test vectors                                         |

### Debugging Tips

1. **Compare with Test Vectors**: Verify your implementation against the provided test vectors
2. **Check Input Formats**: Ensure IP addresses are properly formatted
3. **Verify Key Handling**: Confirm keys are the correct length and properly handled
4. **Inspect Byte Representations**: Debug by examining the 16-byte representations
5. **Use Consistent Encoding**: Ensure consistent encoding for non-deterministic outputs

## Security Considerations

When implementing IPCrypt, be aware of these security considerations:

1. **Key Security**: The security of IPCrypt depends entirely on the secrecy of the key
2. **Deterministic Limitations**: Deterministic encryption reveals patterns in the data
3. **Tweak Randomness**: For non-deterministic modes, tweaks must be uniformly random
4. **Side-Channel Attacks**: Implement using constant-time operations where possible
5. **Format Preservation**: Consider cycle-walking for strict IPv4 format preservation if needed

## Additional Resources

### Tools

- [IPCrypt Test Vector Generator](https://github.com/jedisct1/draft-denis-ipcrypt/tree/main/implementations/python/generate_test_vectors.py): Generate test vectors for verification
- [IPCrypt Playground]({{ site.baseurl }}/playground/): Interactive web tool to experiment with IPCrypt

### Documentation

- [FAQ]({{ site.baseurl }}/faq/): Answers to frequently asked questions about IPCrypt
- [Glossary]({{ site.baseurl }}/glossary/): Definitions of technical terms related to IPCrypt
- [Code Examples]({{ site.baseurl }}/code-examples/): Sample code in various programming languages
- [Community]({{ site.baseurl }}/community/): Information about contributing to IPCrypt

### References

- [RFC6973: Privacy Considerations for Internet Protocols](https://datatracker.ietf.org/doc/html/rfc6973)
- [RFC7258: Pervasive Monitoring Is an Attack](https://datatracker.ietf.org/doc/html/rfc7258)
- [RFC4291: IP Version 6 Addressing Architecture](https://datatracker.ietf.org/doc/html/rfc4291)

### Community Support

If you need help implementing or using IPCrypt:

1. **GitHub Issues**: Post questions or issues on the [GitHub repository]({{ site.github_repo }}/issues)
2. **Contribute**: Share your experiences and improvements with the community
3. **Contact**: Reach out to the contributors for specific questions