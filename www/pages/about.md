---
layout: page
title: About IPCrypt
description: Learn about IPCrypt, its purpose, benefits, and how it addresses privacy concerns in network operations and analytics with real-world examples.
permalink: /about/
---

## What is IPCrypt?

IPCrypt is a simple, open specification that defines methods for encrypting and obfuscating IP addresses. It offers both deterministic format-preserving and non-deterministic approaches that work with both IPv4 and IPv6 addresses.

This specification addresses concerns raised in [RFC7624](https://datatracker.ietf.org/doc/html/rfc7624) regarding confidentiality when sharing data with third parties, providing cryptographically sound techniques that enable data analysis while protecting user privacy from parties without key access.

## The Challenge We're Addressing

IP addresses are personally identifiable information requiring protection, yet common techniques have fundamental limitations:

1. **Truncation Problems**: Zeroing parts of addresses provides unpredictable privacy - a /24 mask may hide one user or thousands
2. **Hashing Limitations**: Produces non-reversible outputs unsuitable for operational tasks like abuse investigation
3. **Ad-hoc Schemes**: Often lack rigorous security analysis and cannot interoperate between systems
4. **Generic Encryption Issues**: Expands data unpredictably, breaks compatibility with network tools, operates too slowly for high-volume processing
5. **Regulatory Requirements**: GDPR and similar regulations require proper protection of IP addresses as personal data

IPCrypt resolves these conflicts through purpose-built cryptographic techniques designed for network-rate processing.

## Potential Benefits

### For Network Operators

- **Efficiency and Compactness**: All variants operate on exactly 128 bits, achieving single-block encryption speed
- **High Usage Limits**: Non-deterministic variants safely handle ~4 billion (nd) to ~18 quintillion (ndx) operations per key
- **Format Preservation**: Deterministic mode produces valid IP addresses that flow through existing infrastructure
- **Interoperability**: Identical results across implementations enable seamless data exchange

### For Privacy Advocates

- **Protection Against Third Parties**: Prevents unauthorized access to user information without the encryption key
- **Correlation Attack Resistance**: Non-deterministic modes use random tweaks to hide patterns
- **Mathematically Provable Security**: Unlike truncation or basic hashing, provides rigorous security properties
- **Privacy-Preserving Analytics**: Enables counting, rate limiting, and deduplication without exposing original values

### For Developers

- **Community Implementations**: Free implementations available in various programming languages
- **Different Options**: Choose the mode that fits your specific needs
- **Straightforward Integration**: Designed to be simple to add to existing systems
- **Open Documentation**: Clear specification with examples to help implementation

## How IPCrypt Works

IPCrypt operates by converting IP addresses to a 16-byte representation and then applying cryptographic operations:

1. **IP Address Conversion**: Both IPv4 and IPv6 addresses are converted to a standard 16-byte format
2. **Encryption**: The 16-byte representation is encrypted using one of three modes:
   - **ipcrypt-deterministic**: Using AES-128 as a single-block operation
   - **ipcrypt-nd**: Using KIASU-BC with an 8-byte tweak
   - **ipcrypt-ndx**: Using AES-XTS with a 16-byte tweak
3. **Output**: Deterministic produces 16 bytes, nd produces 24 bytes (16 + 8 tweak), ndx produces 32 bytes (16 + 16 tweak)

## Encryption Modes Explained

### ipcrypt-deterministic

- Uses AES-128 as a single-block operation
- Produces a 16-byte output, most compact option
- Same IP always produces same ciphertext (allows correlation but enables duplicate detection)
- Choose when duplicate identification is needed or format preservation is critical

### ipcrypt-nd

- Uses the KIASU-BC tweakable block cipher with an 8-byte tweak
- Produces a 24-byte output (16-byte ciphertext + 8-byte tweak)
- Same IP produces different ciphertexts (prevents most correlation)
- Approximately 4 billion operations per key safely

### ipcrypt-ndx

- Uses the AES-XTS tweakable block cipher with a 16-byte tweak
- Produces a 32-byte output (16-byte ciphertext + 16-byte tweak)
- Maximum privacy protection when storage permits
- Approximately 18 quintillion operations per key safely

## Comparison with Common Approaches

Many organizations currently use flawed mechanisms to protect IP addresses:

1. **Truncation**: Irreversibly destroys data while providing inconsistent privacy (a /24 mask may hide one user or thousands)
2. **Simple Hashing**: Non-reversible, unsuitable for operational tasks like abuse investigation
3. **Ad-hoc Encryption**: Often lacks rigorous security analysis and cannot interoperate
4. **Generic Encryption**: Too slow for network speeds, expands data unpredictably

IPCrypt offers fundamental advantages:

| Feature                     | Common Approaches           | IPCrypt                                     |
| --------------------------- | --------------------------- | ------------------------------------------- |
| Speed                       | Varies, often slow          | Single-block speed for network rates        |
| Data Size                   | Often expands significantly | Compact: 16-32 bytes total                 |
| Reversibility               | Usually one-way             | Fully reversible with key                  |
| Security Analysis           | Often unclear               | Mathematically provable properties         |
| Interoperability            | Usually proprietary         | Standardized across implementations        |
| Privacy Guarantees          | Inconsistent                | Configurable: deterministic or randomized  |
| Format Preservation         | Rarely supported            | Available in deterministic mode            |

## Real-World Applications

This section showcases practical examples of how IPCrypt can be used in various environments.

### Network Logging and Analysis

Network logs often contain IP addresses that may be considered personal data under privacy regulations. By using IPCrypt, organizations can maintain the utility of their logs while protecting user privacy.

```python
# Example: Privacy-preserving logging with IPCrypt
from ipcrypt import IPCrypt
import logging

# Initialize IPCrypt with a secure key
key = bytes.fromhex("0123456789abcdeffedcba9876543210")
ipcrypt = IPCrypt(key)

def log_network_event(client_ip, event_type, timestamp):
    # Encrypt the IP address using deterministic mode
    encrypted_ip = ipcrypt.encrypt_deterministic(client_ip)
    
    # Log the event with the encrypted IP
    logging.info(f"Event: {event_type}, IP: {encrypted_ip}, Time: {timestamp}")
    
    # For internal analysis, we can still group by IP address
    # since deterministic mode produces consistent results
    return encrypted_ip
```

**Benefits:**
- Logs can still be analyzed for patterns and anomalies
- IP addresses are protected from casual observation
- Compliance with privacy regulations is improved
- Original IPs can be recovered if necessary with the key

### Data Sharing Between Organizations

Security researchers often need to share data about network attacks across organizational boundaries. Using IPCrypt's non-deterministic modes allows for secure sharing without revealing the actual IP addresses.

```python
# Example: Sharing security data between organizations
from ipcrypt import IPCrypt
import os
import json

# Each organization uses their own key
org_key = bytes.fromhex("0123456789abcdeffedcba9876543210")
ipcrypt = IPCrypt(org_key)

def prepare_data_for_sharing(attack_data):
    sanitized_data = []
    
    for incident in attack_data:
        # Generate a random tweak for each sharing instance
        tweak = os.urandom(16)
        
        # Use non-deterministic extended mode for maximum security
        encrypted_ip = ipcrypt.encrypt_ndx(incident["source_ip"], tweak)
        
        # Replace the actual IP with the encrypted version
        incident_copy = incident.copy()
        incident_copy["source_ip"] = encrypted_ip
        incident_copy["tweak"] = tweak.hex()  # Include the tweak for potential decryption
        
        sanitized_data.append(incident_copy)
    
    return json.dumps(sanitized_data)
```

**Benefits:**
- Attack patterns can be shared without exposing actual IP addresses
- Each sharing instance uses different tweaks, preventing correlation
- The original organization can still decrypt if needed
- Recipient organizations can analyze patterns without seeing actual IPs

### Database Storage and Querying

When storing IP addresses in databases, organizations often need to balance privacy with the ability to query and analyze the data. IPCrypt's deterministic mode enables this balance.

```sql
-- Example database schema with IPCrypt-encrypted IP addresses

CREATE TABLE web_traffic (
    id SERIAL PRIMARY KEY,
    encrypted_ip_deterministic VARCHAR(39) NOT NULL,  -- For querying
    encrypted_ip_nd TEXT,                            -- For maximum privacy
    request_path TEXT NOT NULL,
    user_agent TEXT,
    timestamp TIMESTAMP NOT NULL,
    response_code INTEGER
);

-- Create an index on the deterministic version for efficient queries
CREATE INDEX idx_web_traffic_ip ON web_traffic(encrypted_ip_deterministic);

-- Example query to find all requests from a specific IP (after encrypting it)
SELECT request_path, timestamp, response_code 
FROM web_traffic 
WHERE encrypted_ip_deterministic = 'ENCRYPTED_IP_VALUE';

-- Example query to count requests by IP (privacy-preserving analytics)
SELECT encrypted_ip_deterministic, COUNT(*) as request_count
FROM web_traffic
GROUP BY encrypted_ip_deterministic
ORDER BY request_count DESC
LIMIT 10;
```

**Benefits:**
- IP addresses are not stored in plaintext
- Queries can still be performed efficiently using indexes
- Analytics and grouping operations work as expected
- Privacy is maintained while preserving functionality

### Regulatory Compliance

Under GDPR and similar regulations, IP addresses are considered personal data. IPCrypt can help organizations comply with these regulations while still collecting necessary analytics.

```python
# Example: GDPR-compliant analytics collection
from ipcrypt import IPCrypt
import time

# Initialize IPCrypt with a secure key
key = bytes.fromhex("0123456789abcdeffedcba9876543210")
ipcrypt = IPCrypt(key)

class PrivacyCompliantAnalytics:
    def __init__(self):
        self.page_views = {}
        self.unique_visitors = set()
    
    def record_page_view(self, client_ip, page_path):
        # Use deterministic encryption for consistent visitor counting
        encrypted_ip = ipcrypt.encrypt_deterministic(client_ip)
        
        # Count the page view
        if page_path not in self.page_views:
            self.page_views[page_path] = 0
        self.page_views[page_path] += 1
        
        # Count unique visitors
        self.unique_visitors.add(encrypted_ip)
    
    def get_analytics_report(self):
        return {
            "total_page_views": sum(self.page_views.values()),
            "unique_visitors": len(self.unique_visitors),
            "popular_pages": sorted(self.page_views.items(), 
                                   key=lambda x: x[1], 
                                   reverse=True)
        }
```

**Benefits:**
- Analytics can be collected without storing personal data
- Unique visitor counting still works accurately
- No need to obtain explicit consent for IP storage
- Reduced risk in case of data breaches

## Implementation Considerations

When implementing IPCrypt in real-world applications, consider the following:

1. **Key Management**: Securely store and manage encryption keys
2. **Mode Selection**: Choose the appropriate encryption mode based on your specific needs
3. **Performance**: For high-volume applications, consider caching or batch processing
4. **Backup**: Ensure keys are securely backed up to prevent data loss
5. **Documentation**: Clearly document the encryption approach for future reference

## Getting Started

Ready to implement IPCrypt in your project? Check out our [developer resources]({{ site.baseurl }}/resources/) and choose from [multiple language implementations]({{ site.baseurl }}/implementations/).

For a detailed understanding of the cryptographic constructions, read the full [specification](https://datatracker.ietf.org/doc/draft-denis-ipcrypt/){:target="_blank" rel="noopener"}.