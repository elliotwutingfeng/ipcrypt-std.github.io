#!/bin/bash
# Setup script for the IPCrypt website

# Make sure we're in the www directory
cd "$(dirname "$0")"

echo "Setting up the IPCrypt website..."

# Check if Ruby is installed
if ! command -v ruby &>/dev/null; then
    echo "Ruby is not installed. Please install Ruby before continuing."
    echo "Visit https://www.ruby-lang.org/en/documentation/installation/ for instructions."
    exit 1
fi

# Check if Bundler is installed
if ! command -v bundle &>/dev/null; then
    echo "Bundler is not installed. Installing now..."
    gem install bundler
fi

# Remove existing Gemfile.lock if it exists
if [ -f "Gemfile.lock" ]; then
    echo "Removing existing Gemfile.lock..."
    rm Gemfile.lock
fi

# Install dependencies
echo "Installing dependencies..."
bundle install

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p assets/images
mkdir -p assets/css
mkdir -p assets/js
mkdir -p _data
mkdir -p _includes
mkdir -p _layouts
mkdir -p _sass
mkdir -p pages
mkdir -p _implementations
mkdir -p examples

echo "Setup complete!"
echo ""
echo "To run the website locally:"
echo "  bundle exec jekyll serve"
echo ""
echo "The website will be available at http://localhost:4000/draft-denis-ipcrypt/"
echo ""
echo "Note: If you encounter any issues, try running:"
echo "  bundle update"
echo "  bundle exec jekyll clean"
echo "  bundle exec jekyll serve"
