#!/bin/bash

# Script to check GitHub Pages deployment status

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Checking GitHub Pages deployment status...${NC}"

# Get the repository name from git config
REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(basename -s .git "$REPO_URL")
ORG_NAME=$(echo "$REPO_URL" | sed -n 's/.*github.com[:/]\([^/]*\).*/\1/p')

if [ -z "$ORG_NAME" ] || [ -z "$REPO_NAME" ]; then
    echo -e "${RED}Could not determine repository information.${NC}"
    exit 1
fi

echo -e "Organization: ${GREEN}$ORG_NAME${NC}"
echo -e "Repository: ${GREEN}$REPO_NAME${NC}"

# Check if GitHub Pages is enabled
echo -e "\n${YELLOW}GitHub Pages URLs to check:${NC}"
echo -e "1. Organization site: ${GREEN}https://$ORG_NAME.github.io/${NC}"
echo -e "2. Project site: ${GREEN}https://$ORG_NAME.github.io/$REPO_NAME/${NC}"

# Check for CNAME file
if [ -f "www/CNAME" ]; then
    CUSTOM_DOMAIN=$(cat www/CNAME)
    echo -e "3. Custom domain: ${GREEN}https://$CUSTOM_DOMAIN${NC}"
fi

echo -e "\n${YELLOW}Configuration files:${NC}"

# Check _config.yml
if [ -f "www/_config.yml" ]; then
    echo -e "${GREEN}www/_config.yml exists${NC}"
    echo -e "baseurl: $(grep "^baseurl:" www/_config.yml)"
    echo -e "url: $(grep "^url:" www/_config.yml)"
else
    echo -e "${RED}www/_config.yml not found${NC}"
fi

# Check for .nojekyll
if [ -f "www/.nojekyll" ]; then
    echo -e "${GREEN}www/.nojekyll exists${NC}"
else
    echo -e "${RED}www/.nojekyll not found${NC}"
fi

# Check for GitHub workflow file
if [ -f ".github/workflows/jekyll-gh-pages.yml" ]; then
    echo -e "${GREEN}.github/workflows/jekyll-gh-pages.yml exists${NC}"
else
    echo -e "${RED}GitHub Actions workflow file not found${NC}"
fi

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Check GitHub Actions tab for workflow status"
echo -e "2. Review 'github-pages-setup.md' for detailed configuration instructions"
echo -e "3. If using a custom domain, verify DNS settings"

echo -e "\n${GREEN}Done!${NC}"
