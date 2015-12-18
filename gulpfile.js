
"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev-append');   //cashing
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var uncss = require('gulp-uncss');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();


gulp.task('serve', ['styles', 'scripts'], function() {
    browserSync.init({
        server: "./build",
        port:8000
    });

});

gulp.task('imagemin', function () {
  return gulp.src('./build/img/**/*.*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [imageminPngquant()]
    }))
  	.pipe(imageminPngquant({quality: '65-80', speed: 4})())
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('uncss', function () {
    return gulp.src('./build/css/main.css')
        .pipe(uncss({
            html: ['./build/index.html']
        }))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('styles', function () {
  gulp.src('./src/sass/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(plumber())
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src(['./src/js/functions.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream());
});

gulp.task('rev', function() {
  gulp.src('./build/index.html')
    .pipe(rev())
    .pipe(gulp.dest('./build/'));
});


gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.*', ['styles']);
  gulp.watch(['./src/js/functions.js'], ['scripts']);
  gulp.watch("./build/*.html").on('change', browserSync.reload);
});

gulp.task('builder', ['styles', 'scripts', 'uncss', 'rev']);

gulp.task('default', ['serve',  'watch']);
