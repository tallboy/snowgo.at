const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

// Copy third party libraries from /node_modules into /vendor
gulp.task("vendor", () => {
  // Bootstrap
  gulp
    .src([
      "./node_modules/bootstrap/dist/**/*",
      "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
      "!./node_modules/bootstrap/dist/css/bootstrap-reboot*",
    ])
    .pipe(gulp.dest("./vendor/bootstrap"));

  // Font Awesome
  gulp
    .src([
      "./node_modules/font-awesome/**/*",
      "!./node_modules/font-awesome/{less,less/*}",
      "!./node_modules/font-awesome/{scss,scss/*}",
      "!./node_modules/font-awesome/.*",
      "!./node_modules/font-awesome/*.{txt,json,md}",
    ])
    .pipe(gulp.dest("./vendor/font-awesome"));

  // jQuery
  gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js",
    ])
    .pipe(gulp.dest("./vendor/jquery"));

  // jQuery Easing
  gulp
    .src(["./node_modules/jquery.easing/*.js"])
    .pipe(gulp.dest("./vendor/jquery-easing"));

  // Magnific Popup
  gulp
    .src(["./node_modules/magnific-popup/dist/*"])
    .pipe(gulp.dest("./vendor/magnific-popup"));
});

// Compile SCSS
gulp.task("css:compile", () => {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(
      sass
        .sync({
          outputStyle: "expanded",
        })
        .on("error", sass.logError)
    )
    .pipe(gulp.dest("./css"));
});

// Minify CSS
gulp.task(
  "css:minify",
  gulp.series("css:compile", () => {
    return gulp
      .src(["./css/*.css", "!./css/*.min.css"])
      .pipe(cleanCSS())
      .pipe(
        rename({
          suffix: ".min",
        })
      )
      .pipe(gulp.dest("./css"))
      .pipe(browserSync.stream());
  })
);

// CSS
gulp.task("css", gulp.series("css:compile", "css:minify"));

// Minify JavaScript
gulp.task("js:minify", () => {
  return gulp
    .src(["./js/*.js", "!./js/*.min.js"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./js"))
    .pipe(browserSync.stream());
});

// JS
gulp.task("js", gulp.task("js:minify"));

// Default task
gulp.task(
  "default",
  gulp.series(gulp.task("css"), gulp.task("js"), gulp.task("vendor"))
);

// Configure the browserSync task
gulp.task("browserSync", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
});

// Dev task
gulp.task(
  "dev",
  gulp.series("css", "js", "browserSync", () => {
    gulp.watch("./scss/*.scss", ["css"]);
    gulp.watch("./js/*.js", ["js"]);
    gulp.watch("./*.html", browserSync.reload);
  })
);
