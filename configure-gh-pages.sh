#!/bin/bash

# Script to help configure GitHub Pages settings

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}GitHub Pages Configuration Helper${NC}"
echo -e "${YELLOW}=================================${NC}\n"

echo -e "${YELLOW}This script will help you configure GitHub Pages to deploy your site to the root URL.${NC}"
echo -e "${YELLOW}Please follow these steps:${NC}\n"

echo -e "1. ${GREEN}Go to your GitHub repository:${NC}"
echo -e "   https://github.com/ipcrypt-std/www/settings/pages\n"

echo -e "2. ${GREEN}Under 'Build and deployment' section:${NC}"
echo -e "   - Source: ${YELLOW}GitHub Actions${NC}"
echo -e "   (This should already be selected)\n"

echo -e "3. ${GREEN}Under 'Custom domain' section:${NC}"
echo -e "   - Make sure this is empty (unless you want to use a custom domain)\n"

echo -e "4. ${GREEN}Check your repository name:${NC}"
echo -e "   - If your repository is named 'ipcrypt-std.github.io', your site will be published at:"
echo -e "     ${YELLOW}https://ipcrypt-std.github.io/${NC}"
echo -e "   - If your repository is named 'www', your site will be published at:"
echo -e "     ${YELLOW}https://ipcrypt-std.github.io/www/${NC}"
echo -e "   - To publish at the root URL with a repository named 'www', you need to:"
echo -e "     a. Create a new repository named 'ipcrypt-std.github.io'"
echo -e "     b. Push your code to that repository"
echo -e "     c. Configure GitHub Pages as described above\n"

echo -e "5. ${GREEN}Alternative approach - Create a gh-pages branch:${NC}"
echo -e "   If you want to keep your repository name as 'www' but deploy to the root URL,"
echo -e "   you can create a gh-pages branch with a special structure:"
echo -e "   $()$(bash"
echo -e " git checkout --orphan gh-pages"
echo -e " git rm -rf ."
echo -e " echo '<meta http-equiv=\"refresh\" content=\"0;url=https://ipcrypt-std.github.io/www/\">' \
    git add index.html"
echo -e " git commit -m \"Add redirect to www subdirectory\""
echo -e " git push origin gh-pages"
echo -e " >index.html"
echo -e ")$()"
echo -e "   Then in GitHub repository settings, set the source to 'Deploy from a branch'"
echo -e "   and select the 'gh-pages' branch.\n"

echo -e "${YELLOW}After making these changes, your site should be deployed to the root URL.${NC}"
echo -e "${YELLOW}It may take a few minutes for the changes to take effect.${NC}\n"

echo -e "${GREEN}Done!${NC}"
