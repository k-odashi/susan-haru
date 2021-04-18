var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ejs = require('gulp-ejs');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var fs = require('fs');
var dist = './dist/';

var browserSyncOption = {
  server: './dist/',
};

gulp.task('serve', (done) => {
  browserSync.init(browserSyncOption);
  done();
});

gulp.task('ejs', (done) => {
  gulp
    .src(['ejs/**/' + '*.ejs', '!' + 'ejs/**/_*.ejs'])
    .pipe(ejs())
    .pipe(plumber())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./dist/'));
  done();
});

gulp.task('watch', (done) => {
  const browserReload = (done) => {
    browserSync.reload();
    done();
  };
  gulp.watch('ejs/**/*.ejs', gulp.series('ejs', browserReload));
  gulp.watch(dist + '*', browserReload);
});

gulp.task('default', gulp.series('serve', 'watch'));
