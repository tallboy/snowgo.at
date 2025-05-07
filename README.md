# Snow G.O.A.T.s

Fan site for ServiceNow's G(reatest) O(f) A(ll) T(ime). Submit Pull Requests to nominate a Snow GOAT. We're also Hacktoberfest 2021 official.

## Adding a New GOAT

### Automated Method (Recommended)

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

### Manual Method

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

**Note**: The site now uses a consolidated approach where all goat data is defined in a single file (`goats.js`) and automatically made available to the frontend.

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

The site is deployed automatically on successful pull requests to `main`. You should be able to see your changes right away on [https://snowgo.at](https://snowgo.at). If, for some reason, changes aren't reflected immediately it could be a caching issue.
