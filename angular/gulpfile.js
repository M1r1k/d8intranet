// Generated on 2015-04-21 using generator-angular 0.11.1
'use strict';

var
  gulp = require('gulp'),                       // Gulp JS
  sass = require('gulp-sass'),                  // Sass
  plumber = require('gulp-plumber'),            // Plumber
  livereload = require('gulp-livereload'),      // Livereload для Gulp
  imagemin = require('gulp-imagemin'),          // Minimize images
  uglify = require('gulp-uglify'),              // Minimize JS
  concat = require('gulp-concat'),              // Concatination of files
  minifyCss = require('gulp-minify-css'),       // Minify CSS
  rename = require('gulp-rename'),              // File rename
  jshint = require('gulp-jshint'),              // JS hint
  minifyHTML = require('gulp-minify-html'),     // Minify HTML
  scsslint = require('gulp-scss-lint'),         // SCSS hint
  prefix = require('gulp-autoprefixer'),        // Autoprefixer
  connect = require('gulp-connect'),            // Webserver
  notify = require("gulp-notify"),
  htmlreplace = require('gulp-html-replace');   // HTML Replace

// Liver reload auto start
livereload({start: true});

// General paths to the files
var paths = {
  sass: ['./app/sass/**/*.scss'],
  html: ['./app/**/*.html'],
  css: './app/styles/',
  scripts: ['./app/scripts/**/*.js']
};

// -----------------------------------------------------------------------------
// Web server task
gulp.task('connect', function () {
  connect.server({
    port: 8888,
    livereload: true,
    host: 'angular.d8pp.dev',
    root: './app',

    middleware: function (connect, opt) {
      return [
        connect().use(
          '/bower_components',
          connect.static('./bower_components')
        )
      ];
    }

  });
});

// -----------------------------------------------------------------------------
// Live reload for changes in html pages
gulp.task('html', function (done) {
  gulp.src(paths.html)
    .pipe(livereload())
    .pipe(connect.reload())
    .pipe(gulp.dest('app/'))
    .on('end', done);
});

// -----------------------------------------------------------------------------
// SCSS compilation task with livereload
gulp.task('sass', function (done) {
  gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass(({errLogToConsole: true})))
    .pipe(prefix({ browsers: ['last 2 version'] }))
    .on('error', swallowError)
    .pipe(gulp.dest(paths.css))
    .pipe(livereload())
    .pipe(connect.reload())
    .on('end', done);
});

// -----------------------------------------------------------------------------
// JS
gulp.task('scripts', function(){
  gulp.src(paths.scripts)
    .pipe(gulp.dest('./app/scripts/'))
    .pipe(livereload())
    .pipe(connect.reload());
});

// SCSS lint
gulp.task('scss-lint', function () {
  gulp.src(['app/sass/**/*.scss', '!app/sass/vendor/**/*.scss', '!app/sass/base/utils/**/*.scss', '!app/sass/base/_base.scss'])
    .pipe(scsslint({
      'config': 'lint.yml'
    }));
});



// Task which watching changes in files
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.sass, ['sass']);
  //gulp.watch(paths.scripts, ['scripts']);
});


// JS lint for errors in code
gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Default task
gulp.task('serve', ['connect', 'watch']);

function swallowError(error) {
  //If you want details of the error in the console
  console.log(error.toString());
  this.emit('end');
}


// -----------------------------------------------------------------------------
// Build project
gulp.task('build', function (done) {

  // ---------------------------------
  // CSS autoprefixer
  gulp.src(paths.scripts)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./build/css/'));


  // ---------------------------------
  // HTML Replace
//  gulp.src('./public/index.html')
//    .pipe(htmlreplace({
//      'css': 'css/main.min.css',
//      'js': 'js/main.js'
//    }))
//    .pipe(gulp.dest('./build/'))
//    .pipe(notify({ title: 'HTML replace', message: 'success', onLast: true }));
//
//
//  // ---------------------------------
//  // CSS
//  gulp.src('./public/css/**/*.css')
//    .pipe(minifyCss({
//      keepSpecialComments: 0
//    }))
//    .pipe(rename({extname: '.min.css'}))
//    .pipe(gulp.dest('./build/css/')) // write results into build/css folder
//    .pipe(notify({ title: 'CSS minification', message: 'success', onLast: true }));
//
//
//  // ---------------------------------
//  // JS
//  gulp.src(['./public/js/**/*.js'])
//    .pipe(concat('main.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('./build/js/'))
//    .pipe(notify({ title: 'JS Compression', message: 'success', onLast: true }));
//
//
//  // ---------------------------------
//  // Image minification
//  //gulp.src('./public/images/**/*')
//  //  .pipe(imagemin())
//  //  .pipe(gulp.dest('./build/img'));
//  //
//
//
//  // ---------------------------------
//  // HTML minification
//  gulp.src('./public/*.html')
//    .pipe(minifyHTML({
//      conditionals: true,
//      spare: true
//    }))
//    .pipe(gulp.dest('./build/'));
});

