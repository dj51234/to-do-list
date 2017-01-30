'use strict';

var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass   = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();

gulp.task('watch',['sass','minify'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['assets/css/**/*.scss','assets/css/*.scss'],['sass']).on('change',browserSync.reload);
    gulp.watch('assets/js/*.js',['minify']).on('change',browserSync.reload);
    gulp.watch('index.html').on('change',browserSync.reload);
});

gulp.task('minify',function(){
    gulp.src('assets/js/main.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('sass',function(){
  gulp.src('assets/css/style.scss')
      .pipe(sass())
      .pipe(prefix())
      .pipe(gulp.dest('assets/css'));
});

gulp.task('default',['watch']);
