/rest//*global -$ */
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Error notifications
var reportError = function(error) {
  $.notify({
    title: 'Gulp Task Error',
    message: 'Check the console.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
}
var config = {
    bootstrapDir: 'bootstrap',

};

// Sass processing
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    // Convert sass into css.pipe(sass({outputStyle: 'compressed'}))
    //.pipe(sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: [config.bootstrapDir + 'assets/stylesheets/bootstrap']
    }))
    // Show errors
    .on('error', reportError)
    // Autoprefix properties
    .pipe($.autoprefixer({
      browsers: ['last 2 versions']
    }))
    // Save css
    //.pipe(sourcemaps.write('map'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.notify({
      title: "SASS Compiled",
      message: "Your CSS files are ready sir.",
      onLast: true
    }));
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/**/*.js')
        .pipe(gulp.dest('js'));
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        cleanupIDs: false
      }]
    }))
    .pipe(gulp.dest('images'));
});

// JS hint
gulp.task('jshint', function() {
  return gulp.src('js/THEMENAME.app.js')
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify({
      title: "JS Hint",
      message: "JS Hint Done",
      onLast: true
    }));
});

// Beautify JS
//gulp.task('beautify', function() {
 // gulp.src('js/_custom.js')
   // .pipe($.beautify({indentSize: 2}))
    //.pipe(gulp.dest('scripts'))
//    .pipe($.notify({
//      title: "JS Beautified",
//      message: "JS files in the theme have been beautified.",
//      onLast: true
//    }))
//    .pipe(gulp.dest('js/app.min.js'));
//});

// Compress JS
gulp.task('compress', function() {
  return gulp.src('js/THEMENAME.app.js')
    .pipe($.uglify())
    .pipe(gulp.dest('js/min'))
    .pipe($.notify({
      title: "JS Minified",
      message: "JS files ",
      onLast: true
    }))
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'js', 'jshint'], function() {
  
  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("js/**/*.js", ['js', 'jshint']);
  gulp.watch("templates/*.twig");
  gulp.watch("**/*.yml");
  gulp.watch("**/*.theme");
  gulp.watch("src/*.php");
  //browserSync.init({
    //proxy: "http://THEMENAME.dev" ,
    //online: true
  //});
});