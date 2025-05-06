# Snow G.O.A.T.s

Fan site for ServiceNow's G(reatest) O(f) A(ll) T(ime). Submit Pull Requests to nominate a Snow GOAT. We're also Hacktoberfest 2021 official.

## Usage

After installation, run `npm install` and then run `npm start` which will open up a preview of the site in your default browser, watch for changes to files, and reload the browser when changes are saved.

You can optionally install [lefthook](https://github.com/evilmartians/lefthook) to enable pre-commit and pre-push hooks to format and lint any changes you make:

```sh
# install lefthook globally. See:
# https://github.com/evilmartians/lefthook/blob/master/docs/install.md
# for other install methods
brew install lefthook

# enable lefthook for this repo (run from repository root directory):
lefthook install
```

#### Scripts

- `npm start`: starts a local development server to preview changes
- `npm run build`: builds a standalone directory of the project into `dist/`
- `npm run lint`: checks the project for lint errors
- `npm run lint-fix`: checks the project for lint errors, automatically fixing issues when possible

## Deployment

The site is deployed using Github Actions on successful pull requests to `main`. You should be able to see your changes right away on [https://snowgo.at](https://snowgo.at). If, for some reason, changes aren't reflected immediately it could be a caching issue with CloudFlare.

### Cloudflare Workers Deployment

The site can also be deployed using Cloudflare Workers:

#### Manual Deployment

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

#### Automated Deployment with GitHub Actions

The project includes a GitHub Actions workflow that automatically builds and deploys the site to Cloudflare Workers when changes are pushed to the `main` branch.

To set up automated deployment:

1. Add the following secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

2. Push changes to the `main` branch, and the site will be automatically deployed to Cloudflare Workers.

For more details, see the [workers-site/README.md](workers-site/README.md) file.
