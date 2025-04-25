---
layout: page
title: IPCrypt Concept Illustrations
description: Visual illustrations of key IPCrypt concepts and encryption modes
permalink: /illustrations/
---

# IPCrypt Concept Illustrations

These illustrations help visualize the key concepts behind IPCrypt's encryption modes and features.

## Deterministic Encryption Mode

<div class="illustration-container deterministic-mode">
  <h3 class="illustration-title">Deterministic Mode</h3>
  
  <div class="illustration-box illustration-ip illustration-ip-input">192.168.1.1</div>
  <div class="illustration-box illustration-key">AES-128 Key</div>
  <div class="illustration-box illustration-process">AES-128</div>
  <div class="illustration-box illustration-output">10.237.143.87</div>
  
  <div class="illustration-arrow illustration-arrow-1"></div>
  <div class="illustration-arrow-vertical illustration-arrow-2"></div>
  <div class="illustration-arrow illustration-arrow-3"></div>
  
  <div class="illustration-box illustration-ip illustration-ip-input-2">192.168.1.1</div>
  <div class="illustration-box illustration-output illustration-output-2">10.237.143.87</div>
  <div class="illustration-arrow illustration-arrow-4"></div>
  
  <div class="illustration-same-key">Same input = Same output</div>
</div>

In deterministic mode, IPCrypt uses AES-128 as a single-block operation. This mode always produces the same output for a given input and key, making it suitable for applications where format preservation is required and linkability is acceptable.

## Non-Deterministic Encryption Mode

<div class="illustration-container nd-mode">
  <h3 class="illustration-title">Non-Deterministic Mode</h3>
  
  <div class="illustration-box illustration-ip illustration-ip-input">192.168.1.1</div>
  <div class="illustration-box illustration-key">AES-128 Key</div>
  <div class="illustration-box illustration-tweak">Random Tweak</div>
  <div class="illustration-box illustration-process">KIASU-BC</div>
  <div class="illustration-box illustration-output">Encrypted IP</div>
  
  <div class="illustration-arrow illustration-arrow-1"></div>
  <div class="illustration-arrow-vertical illustration-arrow-2"></div>
  <div class="illustration-arrow-vertical illustration-arrow-3"></div>
  <div class="illustration-arrow illustration-arrow-4"></div>
  
  <div class="illustration-box illustration-ip illustration-ip-input-2">192.168.1.1</div>
  <div class="illustration-box illustration-process illustration-process-2">KIASU-BC</div>
  <div class="illustration-box illustration-output illustration-output-2">Different IP</div>
  
  <div class="illustration-arrow illustration-arrow-5"></div>
  <div class="illustration-arrow illustration-arrow-6"></div>
  
  <div class="illustration-random-tweak">Different tweak = Different output</div>
</div>

In non-deterministic mode, IPCrypt uses a tweakable block cipher with a random tweak. This produces different outputs for the same input, preventing correlation across datasets.

## Key Management

<div class="illustration-container key-management">
  <h3 class="illustration-title">Key Management</h3>
  
  <div class="illustration-box illustration-key-generation">Generation</div>
  <div class="illustration-box illustration-key-storage">Storage</div>
  <div class="illustration-box illustration-key-rotation">Rotation</div>
  <div class="illustration-box illustration-key-backup">Backup</div>
  
  <div class="illustration-arrow illustration-arrow-1"></div>
  <div class="illustration-arrow illustration-arrow-2"></div>
  <div class="illustration-arrow illustration-arrow-3"></div>
  <div class="illustration-arrow illustration-arrow-4"></div>
</div>

Proper key management is essential for IPCrypt implementation. This includes secure key generation, storage, regular rotation, and reliable backup procedures.

## Privacy Protection

<div class="illustration-container privacy-protection">
  <h3 class="illustration-title">Privacy Protection</h3>
  
  <div class="illustration-box illustration-user">User</div>
  <div class="illustration-box illustration-service">Service</div>
  
  <div class="illustration-box illustration-ip illustration-ip-real">192.168.1.1</div>
  <div class="illustration-box illustration-process">IPCrypt</div>
  <div class="illustration-box illustration-ip illustration-ip-encrypted">Encrypted IP</div>
  
  <div class="illustration-arrow illustration-arrow-1"></div>
  <div class="illustration-arrow illustration-arrow-2"></div>
  
  <div class="illustration-box illustration-shield">Privacy</div>
</div>

IPCrypt helps protect user privacy by encrypting IP addresses before they're shared with services or stored in logs, while maintaining the ability to perform necessary operations.