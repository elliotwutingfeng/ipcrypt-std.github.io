#!/bin/bash

# Script to help configure GitHub Pages settings

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}GitHub Pages Configuration Helper${NC}"
echo -e "${YELLOW}=================================${NC}\n"

echo -e "${GREEN}Great news! Your repository is now named 'ipcrypt-std.github.io'.${NC}"
echo -e "${GREEN}This is the optimal configuration for GitHub Pages.${NC}\n"

echo -e "${YELLOW}Please follow these steps to ensure everything is configured correctly:${NC}\n"

echo -e "1. ${GREEN}Go to your GitHub repository:${NC}"
echo -e "   https://github.com/ipcrypt-std/ipcrypt-std.github.io/settings/pages\n"

echo -e "2. ${GREEN}Under 'Build and deployment' section:${NC}"
echo -e "   - Source: ${YELLOW}GitHub Actions${NC}"
echo -e "   (This should already be selected)\n"

echo -e "3. ${GREEN}Under 'Custom domain' section:${NC}"
echo -e "   - Make sure this is empty (unless you want to use a custom domain)\n"

echo -e "4. ${GREEN}Verify your site is being published:${NC}"
echo -e "   - Your site should be published at: ${YELLOW}https://ipcrypt-std.github.io/${NC}"
echo -e "   - It may take a few minutes for the changes to take effect\n"

echo -e "5. ${GREEN}If you encounter any issues:${NC}"
echo -e "   - Check the 'Actions' tab in your GitHub repository to see if the workflow is running successfully"
echo -e "   - Make sure your _config.yml has the correct URL and baseurl settings:"
echo -e "     baseurl: \"\" # empty for root URL"
echo -e "     url: \"https://ipcrypt-std.github.io\" # the base hostname & protocol for your site"
echo -e "\n"

echo -e "${YELLOW}With the repository named 'ipcrypt-std.github.io', GitHub Pages will automatically${NC}"
echo -e "${YELLOW}deploy your site to the root URL. No additional configuration is needed.${NC}\n"

echo -e "${GREEN}Done!${NC}"
