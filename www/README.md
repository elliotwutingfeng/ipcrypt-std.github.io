# IPCrypt Website

This directory contains the source code for the IPCrypt website, which serves as the primary resource for understanding, implementing, and contributing to the IPCrypt standard for IP address encryption and obfuscation.

## Project Overview

The IPCrypt website aims to:

- Clearly explain IPCrypt's purpose, functionality, benefits, and use cases
- Provide comprehensive technical documentation of the specification
- Highlight existing implementations across various programming languages
- Foster community contributions and adoption
- Emphasize IPCrypt's advantages over ad-hoc mechanisms

## Quick Start

The easiest way to set up the website locally is to use the provided setup script:

```bash
# Make the script executable
chmod +x setup.sh

# Run the setup script
./setup.sh

# Start the development server
bundle exec jekyll serve
```

Then open your browser and navigate to `http://localhost:4000/draft-denis-ipcrypt/`

## Manual Setup

### Prerequisites

- [Git](https://git-scm.com/)
- [Ruby](https://www.ruby-lang.org/en/) (for Jekyll)
- [Bundler](https://bundler.io/)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/jedisct1/draft-denis-ipcrypt.git
   cd draft-denis-ipcrypt/www
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Start the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser and navigate to `http://localhost:4000/draft-denis-ipcrypt/`

## Project Structure

- `_config.yml` - Jekyll configuration
- `_data/` - Data files (implementations, examples)
- `_includes/` - Reusable components
- `_layouts/` - Page templates
- `assets/` - Static assets (CSS, images, JavaScript)
- `pages/` - Content pages
- `_implementations/` - Implementation documentation
- `examples/` - Interactive examples

## Development Resources

- [NOTES.md](NOTES.md) - Comprehensive development notes and planning
- [TODO.md](TODO.md) - Detailed task list for website development

## Troubleshooting

If you encounter issues with the Jekyll build:

1. Remove the Gemfile.lock and reinstall dependencies:
   ```bash
   rm Gemfile.lock
   bundle install
   ```

2. Clean the Jekyll cache:
   ```bash
   bundle exec jekyll clean
   ```

3. Try running with verbose output:
   ```bash
   bundle exec jekyll serve --verbose
   ```

4. If you see dependency conflicts, make sure you're using only GitHub Pages-supported plugins:
   - See the [GitHub Pages dependency versions](https://pages.github.com/versions/) for a list of supported gems
   - The `github-pages` gem includes Jekyll and other dependencies that are maintained by GitHub
   - Avoid adding version constraints for plugins that are already included in the `github-pages` gem

## Deployment

The website is deployed to GitHub Pages automatically when changes are pushed to the main branch. The deployment process is handled by GitHub Actions using the workflow defined in `.github/workflows/jekyll-gh-pages.yml`.

## Contributing

Contributions to the IPCrypt website are welcome! Please see the [CONTRIBUTING.md](../CONTRIBUTING.md) file in the root directory for guidelines.

### Development Workflow

1. Create a new branch for your changes
2. Make your changes and test them locally
3. Commit your changes with a descriptive commit message
4. Push your branch to GitHub
5. Create a pull request

## License

The IPCrypt website content and code are licensed under the terms specified in the [LICENSE.md](../LICENSE.md) file in the root directory.