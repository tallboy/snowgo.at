# Snow G.O.A.T.s

Fan site for ServiceNow's G(reatest) O(f) A(ll) T(ime). Submit Pull Requests to nominate a Snow GOAT.  We're also Hacktoberfest 2021 official.

## Usage

### Basic Usage

After downloading, simply edit the HTML and CSS files included with the template in your favorite text editor to make changes. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can open the `index.html` file in your web browser.

### Advanced Usage

After installation, run `npm install` and then run `gulp dev` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `gulpfile.js` to see which tasks are included with the dev environment.

#### Gulp Tasks

- `npm run gulp` the default task that builds everything
- `npm run dev` browserSync opens the project in your default browser and live reloads when changes are made
- `npm run sass` compiles SCSS files into CSS
- `npm run minify-css` minifies the compiled CSS file
- `npm run minify-js` minifies the themes JS file
- `npm run copy` copies dependencies from node_modules to the vendor directory

## Deployment

The site is deployed using Github Actions on successful pull requests to `main`.  You should be able to see your changes right away on [https://snowgo.at](https://snowgo.at).  If, for some reason, changes aren't reflected immediately it could be a caching issue with CloudFlare.

