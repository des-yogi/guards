"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var htmlmin = require("gulp-htmlmin");
var rename = require("gulp-rename");
var imagezip = require("gulp-image"); // новый плагин
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var objectFitImages = require('postcss-object-fit-images');
var del = require("del");
var runSeq = require("run-sequence");
var server = require("browser-sync").create();

var ttf2woff2 = require("gulp-ttf2woff2");

var dev = ".";
var prod = "./build/";

// var imagemin = require("gulp-imagemin");

gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 version",
        "last 10 Chrome versions",
        "last 10 Firefox versions",
        "last 10 Opera versions",
        "last 10 Edge versions"
      ]}),
      objectFitImages(),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


// gulp.task("images", function() {
//   return gulp.src("build/img/**/*.{png,jpg,gif}")
//     .pipe(imagemin([
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.jpegtran({progressive: true})
//     ]))
//     .pipe(gulp.dest("build/img"));
// });



// Другой (вроде дучший алгоритм минификации изображений) ---
// Не завелся на моей конфигурации node & npm

gulp.task("imagezip", function () {
  return gulp.src("build/img/*")
    .pipe(imagezip())
    .pipe(gulp.dest("build/img"));
});

/*gulp.task("imagezip", function () {
  return gulp.src("img/*")
    .pipe(imagezip({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest("build/img"));
});*/

// ----------------------------------------------------------

gulp.task("symbols", function() {
  return gulp.src("img/icons/*.svg")
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2,otf,ttf,eot}",
    "img/**",
    "js/**",
    "*.html",
    "*.ico"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copy:html", function() {
  return gulp.src([
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("htmlminify", function() {
  return gulp.src("build/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("scripts", function() {
  return gulp.src(["js/**/*.js", "!js/lib/*.js"])
  .pipe(concat("scripts.js"))
  .pipe(gulp.dest("build/js"))
  // .pipe(rename({suffix: ".min"}))
  // .pipe(uglify())
  // .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  runSeq(
    "clean",
    "copy",
    "style",
    "symbols",
    "scripts",
    fn
  );
});

// ttf2woff2.
gulp.task("ttf2woff2", function() {
  gulp.src("fonts/*.ttf")
    .pipe(ttf2woff2())
    .pipe(gulp.dest("fonts"));
});

gulp.task("deploy", function(fn) {
  runSeq(
    "imagezip",
    "htmlminify",
    fn
  );
});

gulp.task("serve", function() {
  server.init({
    server: {
			baseDir: "build"
		},
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("*.html", ["copy:html"]);
  gulp.watch("*.html").on("change", server.reload);
  gulp.watch("js/**/*.js", ["scripts"]);
  // gulp.watch("js/**/*.js").on("change", server.reload);

});
