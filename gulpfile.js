const gulp = require("gulp");

// CSS

const sass         = require('gulp-sass')(require('sass'));
const postcss      = require("gulp-postcss");
const autoprefixer = require("gulp-autoprefixer");

// JS

const webpack   = require('webpack-stream');
const babel     = require('gulp-babel');
const uglify    = require('gulp-uglify');
const concat    = require('gulp-concat');

const sync = require("browser-sync");

// HTML

const html = () => {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("public"))
    .pipe(sync.stream())
}

// CSS

const css = () => {
  return gulp.src("src/sass/style.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss([
      require("postcss-custom-properties")()
    ]))
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 4 versions"]
    }))
    .pipe(gulp.dest("public/css"))
    .pipe(sync.stream())
};
exports.css = css;

// JS

const js = () => {
  return gulp.src('src/js/index.js')
    .pipe(webpack({
      devtool: "eval-source-map",
      output: {
        filename: "index.min.js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/\/node_modules\//'
          }
        ]
      },
      mode: "production"
    }))
    .pipe(gulp.dest('public/js'))
    .pipe(sync.stream());
}

// Watch

const watch = () => {
  gulp.watch("src/*.html",  gulp.series(html));
  gulp.watch("src/sass/**", gulp.series(css));
  gulp.watch("src/js/**",   gulp.series(js));
}
exports.watch = watch;

// Server

const server = () => {
  sync.init({
    server: {
      baseDir: "./public"
    },
    ui: false,
    notify: false
  });
}
exports.server = server;

// Default

exports.default = gulp.series(
  gulp.parallel(html, css, js),
  gulp.parallel(watch, server)
);