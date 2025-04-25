#!/bin/bash

# Script to set up local development environment for the website

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up local development environment...${NC}"

# Add Homebrew Ruby to PATH
echo -e "${YELLOW}Adding Homebrew Ruby to PATH...${NC}"
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# Check Ruby version
echo -e "${YELLOW}Checking Ruby version...${NC}"
ruby_version=$(ruby -v)
echo -e "Ruby version: ${GREEN}$ruby_version${NC}"

# Check if Ruby is from Homebrew
which_ruby=$(which ruby)
if [[ $which_ruby == *"/opt/homebrew/opt/ruby/bin/ruby"* ]]; then
    echo -e "${GREEN}Using Homebrew Ruby: $which_ruby${NC}"
else
    echo -e "${RED}Not using Homebrew Ruby. Current Ruby: $which_ruby${NC}"
    echo -e "${YELLOW}Please make sure Homebrew Ruby is installed:${NC}"
    echo -e "  brew install ruby"
    echo -e "${YELLOW}Then add the following to your shell profile (.zshrc, .bash_profile, etc.):${NC}"
    echo -e "  export PATH=\"/opt/homebrew/opt/ruby/bin:\$PATH\""
    exit 1
fi

# Update RubyGems
echo -e "${YELLOW}Updating RubyGems...${NC}"
gem update --system

# Install Bundler
echo -e "${YELLOW}Installing latest Bundler...${NC}"
gem install bundler

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
cd www
bundle update --bundler
bundle install

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "${YELLOW}To run the site locally:${NC}"
echo -e "  cd www"
echo -e "  bundle exec jekyll serve"

echo -e "\n${YELLOW}To make this setup permanent, add the following to your shell profile (.zshrc, .bash_profile, etc.):${NC}"
echo -e "  export PATH=\"/opt/homebrew/opt/ruby/bin:\$PATH\""

echo -e "\n${GREEN}Done!${NC}"
