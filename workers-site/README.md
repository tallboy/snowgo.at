# Cloudflare Workers Site

This directory contains the Cloudflare Workers configuration for serving the static site built with a custom build process.

## How it works

1. The main project is built using a custom build script (`build-for-cloudflare.js`), which outputs to the `/dist` directory
2. Cloudflare Workers serves the static content from the `/dist` directory
3. The worker script in `index.js` handles requests and serves the appropriate files

## Modern Architecture

This setup uses a modern approach to Cloudflare Workers:

1. **Modern JavaScript**: Uses ES modules and modern JavaScript features
2. **Simplified Dependencies**: Minimizes dependencies to avoid compilation issues
3. **Optimized for Modern Browsers**: Targets modern browsers for better performance
4. **GitHub Actions Integration**: Includes automated deployment via GitHub Actions

## Development

For local development, use the main project's npm scripts:

```bash
# Start the development server
npm start

# Build the project for Cloudflare Workers
npm run cloudflare-build

# Test the Cloudflare Workers build
npm run test-cloudflare
```

## Deployment

### Manual Deployment

To deploy to Cloudflare Workers manually:

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

3. Update the `wrangler.toml` file with your Cloudflare account details:
   - `account_id`: Your Cloudflare account ID
   - `zone_id`: The zone ID for your domain (if deploying to a custom domain)
   - `route`: The route pattern for your site (if deploying to a custom domain)

4. Build and deploy the site:
   ```bash
   npm run cloudflare-build
   wrangler publish
   ```

### Automated Deployment with GitHub Actions

The project includes a GitHub Actions workflow that automatically builds and deploys the site to Cloudflare Workers when changes are pushed to the `main` branch.

To set up automated deployment:

1. Add the following secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

2. Push changes to the `main` branch, and the site will be automatically deployed to Cloudflare Workers.

## Configuration

The configuration for the Cloudflare Workers site is in the `wrangler.toml` file in the root directory.

### Key Configuration Files

- `wrangler.toml`: Cloudflare Workers configuration
- `workers-site/index.js`: Worker script that handles requests
- `build-for-cloudflare.js`: Custom build script for Cloudflare Workers
- `.github/workflows/cloudflare-deploy.yml`: GitHub Actions workflow for automated deployment
