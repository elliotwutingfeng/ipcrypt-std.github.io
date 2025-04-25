---
layout: page
title: IPCrypt Case Studies
description: Real-world examples and applications of IPCrypt in various environments and use cases.
permalink: /case-studies/
---

# IPCrypt in Practice

This page showcases real-world examples of how IPCrypt can be used in various environments. These examples illustrate practical applications of IPCrypt's encryption modes.

## Network Logging and Analysis

### Privacy-Preserving Log Analysis

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

## Data Sharing Between Organizations

### Collaborative Security Research

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

## Database Storage and Querying

### Searchable Encryption for IP Addresses

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

## Cloud Service Integration

### Privacy-Preserving CDN Configuration

Content Delivery Networks (CDNs) often need IP addresses for configuration, such as IP-based access control. Using IPCrypt allows for secure management of these configurations.

```javascript
// Example: Managing CDN IP allowlists with IPCrypt
const { IPCrypt } = require('ipcrypt');
const fs = require('fs');

// Initialize with a secure key
const key = Buffer.from('0123456789abcdeffedcba9876543210', 'hex');
const ipcrypt = new IPCrypt(key);

// Read the list of allowed IPs from a secure location
const allowedIPs = fs.readFileSync('allowed_ips.txt', 'utf8')
  .split('\n')
  .filter(ip => ip.trim().length > 0);

// Encrypt the IPs for storage in the CDN configuration
const encryptedAllowlist = allowedIPs.map(ip => {
  return ipcrypt.encryptDeterministic(ip);
});

// Later, when checking if an IP is allowed
function isIPAllowed(clientIP) {
  const encryptedIP = ipcrypt.encryptDeterministic(clientIP);
  return encryptedAllowlist.includes(encryptedIP);
}
```

**Benefits:**
- IP allowlists can be managed without exposing actual IP addresses
- Configuration files and databases don't contain plaintext IPs
- Access control functionality works as expected
- Reduced risk if configuration files are exposed

## Regulatory Compliance

### GDPR-Compliant Analytics

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

These case studies demonstrate how IPCrypt can be applied in various scenarios to balance operational needs with privacy considerations. By using the appropriate encryption mode for each use case, organizations can maintain functionality while enhancing privacy and security.