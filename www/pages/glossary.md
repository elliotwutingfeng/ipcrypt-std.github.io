---
layout: page
title: IPCrypt Glossary
description: A comprehensive glossary of terms related to IPCrypt, encryption, and network security.
permalink: /glossary/
---

# IPCrypt Glossary

This glossary provides definitions for technical terms related to IPCrypt, encryption, and network security.

## A

### AES (Advanced Encryption Standard)
A symmetric block cipher widely used worldwide, established by the U.S. National Institute of Standards and Technology (NIST) in 2001. IPCrypt uses AES-128 for its deterministic mode.

### AES-XTS
A mode of operation for AES that provides encryption for storage devices. IPCrypt uses AES-XTS for its ndx (non-deterministic extended) mode.

### Authentication
The process of verifying the identity of a user, device, or system. While IPCrypt itself doesn't provide authentication, it can be used as part of a larger security system that includes authentication.

## B

### Block Cipher
A method of encrypting text in which a cryptographic key and algorithm are applied to a block of data at once as a group rather than to one bit at a time. AES is a block cipher used in IPCrypt.

### Byte
A unit of digital information that consists of 8 bits. IPCrypt uses a 16-byte (128-bit) key for encryption.

## C

### Cipher
An algorithm for performing encryption or decryption.

### Ciphertext
The result of encryption performed on plaintext using an algorithm (cipher).

### Correlation Attack
An attack where an adversary can link different encrypted values by analyzing patterns or relationships between them. IPCrypt's non-deterministic modes help prevent correlation attacks.

### Cryptography
The practice and study of techniques for secure communication in the presence of adversaries.

## D

### Decryption
The process of converting encrypted information back to its original form.

### Deterministic Encryption
An encryption method that always produces the same ciphertext for a given plaintext and key. IPCrypt's deterministic mode is an example of this.

## E

### Encryption
The process of converting information into a code to prevent unauthorized access.

### Encryption Key
A piece of information used in combination with an algorithm to transform plaintext into ciphertext and vice versa.

## F

### Format-Preserving Encryption (FPE)
A type of encryption that preserves the format of the input data in the output. IPCrypt's deterministic mode is a form of format-preserving encryption for IP addresses.

## I

### IP Address
A numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. IPCrypt is designed to encrypt both IPv4 and IPv6 addresses.

### IPv4 (Internet Protocol version 4)
The fourth version of the Internet Protocol, using 32-bit addresses typically represented in dot-decimal notation (e.g., 192.168.1.1).

### IPv6 (Internet Protocol version 6)
The most recent version of the Internet Protocol, using 128-bit addresses represented in hexadecimal notation (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334).

### IPCrypt
A specification that defines methods for encrypting and obfuscating IP addresses, providing both deterministic format-preserving and non-deterministic constructions.

### ipcrypt-deterministic
The deterministic mode of IPCrypt that uses AES-128 to encrypt IP addresses while preserving their format.

### ipcrypt-nd
The non-deterministic mode of IPCrypt that uses KIASU-BC with an 8-byte tweak to encrypt IP addresses.

### ipcrypt-ndx
The extended non-deterministic mode of IPCrypt that uses AES-XTS with a 16-byte tweak to encrypt IP addresses.

## K

### Key
In cryptography, a piece of information used to determine the functional output of a cryptographic algorithm. IPCrypt uses a 16-byte (128-bit) key.

### KIASU-BC
A tweakable block cipher based on AES. IPCrypt uses KIASU-BC for its nd (non-deterministic) mode.

## N

### Non-Deterministic Encryption
An encryption method that produces different ciphertexts for the same plaintext and key, typically by incorporating randomness. IPCrypt's nd and ndx modes are non-deterministic.

## P

### Plaintext
The original, unencrypted message or data.

### Privacy
The state of being free from unauthorized intrusion or observation. IPCrypt helps protect privacy by encrypting IP addresses.

### Pseudonymization
A data management and de-identification procedure that replaces private identifiers with fake identifiers or pseudonyms. IPCrypt can be used for IP address pseudonymization.

## R

### RFC (Request for Comments)
A publication from the Internet Engineering Task Force (IETF) that describes methods, behaviors, research, or innovations applicable to the Internet. IPCrypt addresses privacy concerns raised in RFC6973 and RFC7258.

## S

### Security
The state of being protected against unauthorized access or harm. IPCrypt contributes to security by protecting sensitive IP address information.

### Symmetric Encryption
A type of encryption where the same key is used for both encryption and decryption. IPCrypt uses symmetric encryption.

## T

### Tweak
In cryptography, a tweak is a public, non-secret value that is used to add variability to an encryption scheme. IPCrypt's nd and ndx modes use tweaks to achieve non-deterministic encryption.

### Tweakable Block Cipher
A block cipher that takes an additional input, the tweak, along with the usual plaintext and key. KIASU-BC and AES-XTS are tweakable block ciphers used in IPCrypt.

## X

### XTS (XEX-based tweaked-codebook mode with ciphertext stealing)
A mode of operation for block ciphers that provides confidentiality for storage devices. IPCrypt uses AES-XTS for its ndx mode.