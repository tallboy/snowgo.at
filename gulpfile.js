const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', (cb) => {
  // Bootstrap
  gulp
    .src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*',
    ])
    .pipe(gulp.dest('./dist/vendor/bootstrap'));

  // Font Awesome
  gulp
    .src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}',
    ])
    .pipe(gulp.dest('./dist/vendor/font-awesome'));

  // jQuery
  gulp
    .src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js',
    ])
    .pipe(gulp.dest('./dist/vendor/jquery'));

  // jQuery Easing
  gulp
    .src(['./node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('./dist/vendor/jquery-easing'));

  // Magnific Popup
  gulp
    .src(['./node_modules/magnific-popup/dist/*'])
    .pipe(gulp.dest('./dist/vendor/magnific-popup'));

  cb();
});

// Compile SCSS
gulp.task('css:compile', () => gulp
  .src('./scss/**/*.scss')
  .pipe(
    sass
      .sync({
        outputStyle: 'expanded',
      })
      .on('error', sass.logError),
  )
  .pipe(cleanCSS())
  .pipe(
    rename({
      suffix: '.min',
    }),
  )
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream()));

// CSS
gulp.task('css', gulp.task('css:compile'));

// Minify JavaScript
gulp.task('js:minify', () => gulp
  .src(['./js/*.js'])
  .pipe(terser())
  .pipe(
    rename({
      suffix: '.min',
    }),
  )
  .pipe(gulp.dest('./dist/js')));

// JS
gulp.task('js', gulp.task('js:minify'));

// Optimize images
gulp.task('assets', () => gulp
  .src('img/**/*.{jpeg,jpg,png}')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img/')));

// Optimize HTML
gulp.task('html', () => gulp
  .src('*.html')
  .pipe(htmlmin())
  .pipe(gulp.dest('dist')));

// Default task
gulp.task(
  'default',
  gulp.parallel('html', 'css', 'js', 'assets', 'vendor'),
);

// Configure the browserSync task
gulp.task('browserSync', (cb) => {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
  });
  cb();
});

// Dev task
gulp.task(
  'dev',
  gulp.series('default', 'browserSync', (cb) => {
    const reload = (done) => {
      browserSync.reload();
      done();
    };

    gulp.watch('./scss/*.scss', gulp.task('css'));
    gulp.watch('./img/**/*.{jpeg,png,jpg}', gulp.series('assets', reload));
    gulp.watch('./js/*.js', gulp.series('js', reload));
    gulp.watch('./*.html', gulp.series('html', reload));
    cb();
  }),
);
