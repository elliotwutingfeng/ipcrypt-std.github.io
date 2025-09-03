---
layout: page
title: IPCrypt Developer Resources
description: Resources for developers implementing and using IPCrypt, including guides, examples, and best practices.
permalink: /resources/
---

## Community Resources

This page offers helpful resources for anyone interested in IPCrypt. Whether you're looking to use an existing implementation or create your own, we hope these materials will be useful.

## Getting Started

### Understanding IPCrypt

If you're new to IPCrypt, here are some places to start:

1. **Visit the [About IPCrypt]({{ site.baseurl }}/about/) page** for a general overview
2. **Look at the [Specification](https://datatracker.ietf.org/doc/draft-denis-ipcrypt/){:target="_blank" rel="noopener"}** for technical details
3. **Browse the [Implementations]({{ site.baseurl }}/implementations/)** to see what's available in different languages

### Quick Start Guide

To implement IPCrypt:

1. **Choose an encryption mode** based on your requirements:
   - `ipcrypt-deterministic`: When you need format preservation or duplicate detection
   - `ipcrypt-nd`: For general privacy protection with reasonable storage overhead
   - `ipcrypt-ndx`: For maximum privacy protection when storage permits
2. **Generate appropriate keys**:
   - 16 bytes (128 bits) for deterministic and nd modes
   - 32 bytes (256 bits) for ndx mode
3. **For non-deterministic modes**, use uniformly random tweaks
4. **Test against the specification's test vectors** to ensure correctness

## Implementation Information

### Key Management Suggestions

Good key management practices are important when using IPCrypt:

- **Creating Keys**: Consider using a cryptographically secure random number generator
- **Storing Keys**: Try to store keys securely, such as in a key management system
- **Changing Keys**: Consider rotating keys periodically as a security practice
- **Key Separation**: Use different keys for different applications or data sets

### Helpful Tips

When working with IPCrypt, here are some suggestions that might be helpful:

1. **Check IP Formats**: It's a good idea to make sure IP addresses are properly formatted before encryption
2. **Handle Errors Kindly**: Consider how your code will respond if something unexpected happens
3. **Think About Timing**: For security-sensitive applications, constant-time operations can help prevent timing analysis
4. **Test Your Code**: You might want to check your implementation against the examples in the specification
5. **Performance Optimization**: All variants are designed for single-block speed critical for network-rate processing

## Simple Examples

### Logging Example

Here's a simple example of how you might use IPCrypt in a logging system:

```python
from ipcrypt import IPCrypt

# Create a key (in a real application, you'd want to store this securely)
key = bytes.fromhex("0123456789abcdeffedcba9876543210")
ipcrypt = IPCrypt(key)

def log_request(client_ip, request_path, status_code):
    # Convert the IP address to an encrypted form
    encrypted_ip = ipcrypt.encrypt_deterministic(client_ip)
    
    # Use the encrypted version in your logs
    logger.info(f"Request from {encrypted_ip} to {request_path} returned {status_code}")
```

### Analytics Example

Here's how you might use IPCrypt with analytics:

```javascript
const { IPCrypt } = require('ipcrypt');

// Create a key (in a real application, you'd want to store this securely)
const key = Buffer.from('0123456789abcdeffedcba9876543210', 'hex');
const ipcrypt = new IPCrypt(key);

function trackVisitor(clientIp) {
  // Convert the IP address to an encrypted form
  const encryptedIp = ipcrypt.encryptDeterministic(clientIp);
  
  // Use the encrypted version as an identifier
  analytics.trackVisitor({
    visitorId: encryptedIp,
    // other analytics data...
  });
}
```

### Rate Limiting Example

Here's a simple example of how you might use IPCrypt for rate limiting:

```go
import (
    "github.com/jedisct1/go-ipcrypt"
    "golang.org/x/time/rate"
)

// A map to keep track of rate limiters by encrypted IP
var limiters = make(map[string]*rate.Limiter)

// Set up IPCrypt with a key (in a real application, store this securely)
key, _ := hex.DecodeString("0123456789abcdeffedcba9876543210")
ipc, _ := ipcrypt.New(key)

func rateLimit(clientIP string) bool {
    // Convert the IP to an encrypted form
    encryptedIP, _ := ipc.EncryptDeterministic(clientIP)
    
    // Find or create a rate limiter for this encrypted IP
    limiter, exists := limiters[encryptedIP]
    if !exists {
        // Set up a new limiter: 10 requests per minute
        limiter = rate.NewLimiter(rate.Limit(10/60), 10)
        limiters[encryptedIP] = limiter
    }
    
    // See if the request should be allowed
    return limiter.Allow()
}
```

## Network Hierarchy and Metadata

IPCrypt does not preserve network hierarchy or prefix relationships. Addresses from the same subnet will not appear related after encryption.

For analytics requiring network metadata:
1. **Extract metadata before encryption** (country, ASN, network type)
2. **Store metadata separately** alongside encrypted addresses
3. **Avoid truncation** - it provides inconsistent privacy and destroys data irreversibly

Example:
```json
{
  "encrypted_ip": "bde9:6789:d353:824c:d7c6:f58a:6bd2:26eb",
  "country": "US",
  "asn": 15169,
  "network_type": "cloud_provider"
}
```

## Ideas for Using IPCrypt

### Storing Encrypted IPs in Databases

If you're thinking about storing encrypted IP addresses in a database, here are some approaches to consider:

1. **Using Deterministic Mode**: This might be helpful when you need to search or query by IP address
2. **Using Non-Deterministic Mode**: This could be better when preventing correlation is more important than searching
3. **Storing Both Versions**: For some use cases, you might want to keep both deterministic and non-deterministic versions

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

### Sharing Data with Others

If you're sharing data with other organizations:

1. **Consider Non-Deterministic Encryption**: This might help prevent correlation across different data sets
2. **Think About What to Share**: It's often good to share only what's necessary
3. **Explain Your Approach**: Let others know that the IP addresses have been encrypted
4. **Maybe Use Different Keys**: For added protection, you could use a different key for shared data

## Help with Common Questions

### Issues You Might Encounter

| Issue                                    | Possible Reason                   | Potential Solution                                              |
| ---------------------------------------- | --------------------------------- | --------------------------------------------------------------- |
| IP format doesn't work                   | The IP address might be malformed | Try checking IP addresses before encryption                     |
| Output doesn't look right                | Byte order or encoding confusion  | Double-check how bytes are ordered and encoded/decoded          |
| Can't decrypt properly                   | Key issues or damaged data        | Verify you're using the right key and the data isn't corrupted  |
| Seems slow                               | Implementation efficiency         | Some implementations might be faster than others for your needs |
| Different results in different languages | Possible implementation issues    | Try comparing with the test examples in the specification       |

### Troubleshooting Suggestions

1. **Look at the Test Examples**: Compare your results with the examples in the specification
2. **Check Your IP Formats**: Make sure IP addresses are in the correct format
3. **Review Your Key Handling**: Check that keys are the right length and handled correctly
4. **Look at the Byte Values**: Sometimes examining the actual bytes can help find issues
5. **Be Consistent with Encoding**: Especially for non-deterministic outputs, consistent encoding is important

## Security Considerations

IPCrypt provides strong confidentiality but explicitly does not provide integrity protection:

**What IPCrypt protects against:**
- Unauthorized parties learning original IP addresses (without the key)
- Statistical analysis revealing patterns (non-deterministic modes)
- Brute-force attacks on the address space (128-bit security level)

**What IPCrypt does NOT protect against:**
- Active attackers modifying encrypted addresses
- Authorized key holders decrypting addresses (by design)
- Traffic analysis based on volume and timing

For applications requiring integrity, add authentication mechanisms like HMAC or authenticated encryption modes.

## Other Helpful Resources

### Tools You Might Find Useful

- [Test Vector Generator](https://github.com/jedisct1/draft-denis-ipcrypt/tree/main/implementations/python/generate_test_vectors.py): A simple script to create test examples
- [Interactive Playground]({{ site.baseurl }}/playground/): A web tool where you can try IPCrypt in your browser

### More Information

- [Encryption Modes]({{ site.baseurl }}/encryption-modes/): More details about the different encryption approaches
- [Code Examples]({{ site.baseurl }}/code-examples/): Example code snippets in various languages
- [Community]({{ site.baseurl }}/community/): How to get involved or contribute


## Getting Help

If you have questions about IPCrypt:

1. **GitHub Issues**: You can post questions on the [GitHub repository]({{ site.github_repo }}/issues)
2. **Join In**: Feel free to share your experiences or suggestions

### Related RFCs

- [RFC6973: Privacy Considerations for Internet Protocols](https://datatracker.ietf.org/doc/html/rfc6973)
- [RFC7258: Pervasive Monitoring Is an Attack](https://datatracker.ietf.org/doc/html/rfc7258)