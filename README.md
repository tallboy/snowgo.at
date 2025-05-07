# 🐐 Snow G.O.A.T.s 🐐

Fan site for ServiceNow's G(reatest) O(f) A(ll) T(ime). Submit Pull Requests to nominate a Snow GOAT. We're also Hacktoberfest 2021 official.

## 🌟 Adding a New GOAT 🌟

### 🤖 Automated Method (Recommended)

We've created a script to automate the process of adding a new goat:

```bash
npm run add-goat -- --name "Your Goat's Name" --image path/to/image.jpg --description "Your goat's description here"
```

The script will:
1. Copy the image to the correct directory with a standardized filename
2. Update the goats.js file with the new entry
3. Format everything correctly

You can use HTML in your description by enclosing it in quotes:

```bash
npm run add-goat -- --name "Jane Doe" --image ~/Pictures/jane.jpg --description "Jane is amazing! <br><br>She also has <b>bold</b> achievements."
```

### ✏️ Manual Method

If you prefer to add a goat manually, follow these steps:

1. Add your goat's photo to the `/img/goats/` directory (JPEG, PNG, or other web-friendly format)
2. Add your goat's information to the `/goats.js` file
3. Follow the existing format:
   ```javascript
   {
     name: "Your Goat's Name",
     image: img("your-goat-filename.jpg"), // Just the filename, the path is handled by the img() function
     description: html`
       Your goat's description here. You can use HTML tags for formatting.
       Keep it respectful and fun!
     `,
   },
   ```
4. Submit a Pull Request with your changes

**Note**: The site now uses a bundled approach where all goat data is defined in a single file (`js/goats-bundle.js`) that combines both the data and the loading logic. This approach eliminates path resolution issues and makes the build process more reliable for both local development and Cloudflare Pages deployment.

## 🚀 Usage

After installation, run `npm install` and then run `npm start` which will open up a preview of the site in your default browser, watch for changes to files, and reload the browser when changes are saved.

The project uses a simple development workflow with no additional tooling required beyond npm.

#### 📜 Scripts

- `npm start`: starts a local development server to preview changes
- `npm run build`: builds a standalone directory of the project into `dist/` (alias for cloudflare-build)
- `npm run cloudflare-build`: builds the project for Cloudflare Pages deployment
- `npm run add-goat`: helper script to add a new goat to the site

## 🌐 Deployment

The site is deployed to Cloudflare Pages automatically on successful pull requests to `main`. The deployment uses the bundled approach to ensure all goat images and data are properly included in the build.

The build process:
1. Creates a `dist` directory with all necessary files
2. Bundles goat data directly into JavaScript for reliable loading
3. Copies all images and assets to their correct locations

You should be able to see your changes right away on [https://snowgo.at](https://snowgo.at). If changes aren't reflected immediately, it could be a caching issue.
