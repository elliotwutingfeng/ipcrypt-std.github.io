# GitHub Pages Setup Guide

This guide will help you configure your GitHub Pages deployment to serve your website from the root URL `https://ipcrypt-std.github.io/`.

## Current Configuration

Your Jekyll site is located in the `www` directory, and your repository is now named `ipcrypt-std.github.io`, which means GitHub Pages will automatically deploy to the root URL.

## Step 1: Repository Settings

1. Go to your GitHub repository (`https://github.com/ipcrypt-std/www`)
2. Click on "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Build and deployment" section:
   - For "Source", select "GitHub Actions"
   - This will use your workflow file to build and deploy the site

## Step 2: Custom Domain (Optional)

If you want to use your custom domain `ipcrypt.stdc.org`:

1. In the GitHub Pages settings, under "Custom domain":
   - Enter your domain: `ipcrypt.stdc.org`
   - Check "Enforce HTTPS" if it's not already enabled
2. Make sure your DNS provider has the correct records:
   - An `A` record pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a `CNAME` record pointing to `ipcrypt-std.github.io`

## Step 3: Alternative Approach - Using gh-pages Branch

If the above configuration doesn't work, you can try using a dedicated `gh-pages` branch:

1. Create a new orphan branch named `gh-pages`:
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   ```

2. Create a simple index.html file to redirect to the correct location:
   ```bash
   echo '<meta http-equiv="refresh" content="0;url=https://ipcrypt-std.github.io/www/">' > index.html
   ```

3. Commit and push the changes:
   ```bash
   git add index.html
   git commit -m "Add redirect to www subdirectory"
   git push origin gh-pages
   ```

4. In GitHub repository settings, under "Pages":
   - Set the source to "Deploy from a branch"
   - Select the "gh-pages" branch and "/ (root)" folder
   - Click "Save"

## Troubleshooting

If you continue to experience issues:

1. Check the GitHub Actions workflow logs for any errors
2. Verify that the `_site` directory is being correctly generated in the `www` directory
3. Make sure the `baseurl` in `_config.yml` is set correctly (empty for root URL)
4. Ensure your custom domain configuration is correct if you're using one