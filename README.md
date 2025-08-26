# IPCrypt Website

This repository contains the source code for the IPCrypt specification website, deployed at [ipcrypt-std.github.io](https://ipcrypt-std.github.io).

## About IPCrypt

IPCrypt is a lightweight encryption technique for IPv4 and IPv6 addresses that preserves address format while providing cryptographic obfuscation. It's designed for applications that need to anonymize IP addresses while maintaining their utility for analysis.

## Repository Structure

- `/www` - Jekyll-based static site source
  - `/_implementations` - Code examples in various languages
  - `/pages` - Main content pages (specification, implementations, etc.)
  - `/assets` - CSS, JavaScript, and images

## Local Development

```bash
cd www
./setup.sh  # Initial setup
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000/`

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

## Contributing

Contributions are welcome! Please feel free to submit pull requests with:
- New language implementations
- Documentation improvements
- Bug fixes
