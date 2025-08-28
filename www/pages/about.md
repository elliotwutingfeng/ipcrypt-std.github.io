---
layout: page
title: About IPCrypt
description: Learn about IPCrypt, its purpose, benefits, and how it addresses privacy concerns in network operations and analytics with real-world examples.
permalink: /about/
---

## What is IPCrypt?

IPCrypt is a simple, open specification that suggests methods for encrypting and obfuscating IP addresses. It offers both deterministic format-preserving and non-deterministic approaches that work with both IPv4 and IPv6 addresses.

This community effort was inspired by privacy concerns highlighted in [RFC6973](https://datatracker.ietf.org/doc/html/rfc6973) and [RFC7258](https://datatracker.ietf.org/doc/html/rfc7258) about pervasive monitoring and data collection. We aimed to help maintain the practical utility of IP addresses in network operations while addressing these privacy considerations.

## The Challenge We're Trying to Help With

IP addresses are fundamental to network operations but present some privacy challenges:

1. **Privacy Considerations**: IP addresses can potentially reveal information about users
2. **Regulatory Context**: Some jurisdictions consider IP addresses as personal data (e.g., GDPR)
3. **Research Limitations**: Difficulty sharing network data for research or analysis
4. **Service Provider Concerns**: Sharing raw IP addresses with external services raises privacy questions
5. **Varied Approaches**: Different organizations use different methods to protect IP addresses

IPCrypt tries to offer a simple, consistent approach to IP address encryption that anyone can implement.

## Potential Benefits

### For Network Operators

- **Practical Functionality**: Use IP addresses for routing, logging, and analytics while considering privacy
- **Regulatory Considerations**: May help with data protection requirements by encrypting identifiers
- **Research Possibilities**: Share network data with researchers without exposing raw addresses
- **Common Approach**: Use a shared specification instead of creating custom solutions

### For Privacy Advocates

- **User Privacy**: Help protect user information in logs and analytics
- **Reduced Tracking**: Non-deterministic modes can prevent correlation across datasets
- **Open Methods**: Clearly defined cryptographic approaches with known properties
- **Versatile Application**: Works with both IPv4 and IPv6 addresses

### For Developers

- **Community Implementations**: Free implementations available in various programming languages
- **Different Options**: Choose the mode that fits your specific needs
- **Straightforward Integration**: Designed to be simple to add to existing systems
- **Open Documentation**: Clear specification with examples to help implementation

## How IPCrypt Works

IPCrypt operates by converting IP addresses to a 16-byte representation and then applying cryptographic operations:

1. **IP Address Conversion**: Both IPv4 and IPv6 addresses are converted to a standard 16-byte format
2. **Encryption**: The 16-byte representation is encrypted using one of three modes:
   - **Deterministic**: Using AES-128 as a single-block operation
   - **Non-deterministic (ND)**: Using KIASU-BC with an 8-byte tweak
   - **Non-deterministic Extended (NDX)**: Using AES-XTS with a 16-byte tweak
3. **Output**: The encrypted result is either returned as a 16-byte value (deterministic) or combined with the tweak (non-deterministic)

## Encryption Modes Explained

### ipcrypt-deterministic

- Uses AES-128 in a single-block operation
- Produces a 16-byte output that can be converted back to an IP address format
- Always produces the same output for a given input and key
- Suitable for applications where format preservation is required and linkability is acceptable

### ipcrypt-nd

- Uses the KIASU-BC tweakable block cipher with an 8-byte tweak
- Produces a 24-byte output (8-byte tweak + 16-byte ciphertext)
- Different outputs for the same input due to random tweak
- Suitable for applications where correlation protection is important

### ipcrypt-ndx

- Uses the AES-XTS tweakable block cipher with a 16-byte tweak
- Produces a 32-byte output (16-byte tweak + 16-byte ciphertext)
- Highest security margin with 128-bit tweak space
- Suitable for applications requiring maximum security and correlation protection

## Comparison with Ad-hoc Mechanisms

Many organizations currently use ad-hoc mechanisms to protect IP addresses, such as:

1. **Simple Hashing**: Vulnerable to rainbow table attacks
2. **Truncation**: Removes information but doesn't provide cryptographic protection
3. **Tokenization**: Often lacks consistency and security guarantees
4. **Custom Encryption**: May have unknown security properties or implementation flaws

IPCrypt offers several advantages over these approaches:

| Feature                     | Ad-hoc Mechanisms    | IPCrypt                              |
| --------------------------- | -------------------- | ------------------------------------ |
| Consistency                 | Varies widely        | Well-defined specification           |
| Security Properties         | Often unclear        | Cryptographically sound              |
| Implementation Availability | Limited              | Multiple languages                   |
| Format Preservation         | Not always supported | Available in deterministic mode      |
| Correlation Protection      | Rarely addressed     | Supported in non-deterministic modes |
| Decryption Capability       | Often one-way        | Fully invertible                     |
| Documentation               | Typically minimal    | Comprehensive specification          |

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