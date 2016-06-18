'use strict';
var gulp = require('gulp'),

    sass = require('gulp-sass'),
    copy = require('gulp-copy'),

    clean = require('gulp-clean'),
    order = require('gulp-order'),


    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),

    connect = require('gulp-connect'),



    browserify = require('browserify'),
    sourcemaps = require('gulp-sourcemaps'),

    autoprefixer2 = require('gulp-autoprefixer');


var paths = {
    js: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/Materialize/dist/js/materialize.min.js'
    ],
    css: [
        'bower_components/Materialize/dist/css/materialize.min.css'
    ]
};


gulp.task('connect', function() {
    return connect.server({
        'port': 4004,
        'livereload': true,
        'root': 'dist/',
        'host': '0.0.0.0'

    });
});

gulp.task('sass', function() {
    return gulp.src('app/style/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer2({
            browsers: ['last 100 versions']
        }))
        .pipe(concat('project.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('vendor_css', function() {
   gulp.src(paths.css)
       .pipe(concat('vendor.css'))
       .pipe(gulp.dest('dist/css'));
});

gulp.task('vendor_js', function() {
    return gulp.src(paths.js)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

//JS
gulp.task('js', function() {
    return browserify('app/js/app.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});



//CSS CONCAT

gulp.task('concat_css', ['vendor_css', 'sass'], function() {});

//Html
gulp.task('html', function() {
    return gulp.src("app/**/*.html")
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

//Copy img and fonts
gulp.task('cleanFonts', function() {
    return gulp.src("dist/fonts/", {read: false}).pipe(clean());
});
gulp.task('cleanImg', function() {
    return gulp.src("dist/img/", {read: false}).pipe(clean());
});

gulp.task('copyImg', ['cleanImg'], function() {
    return gulp.src([
        "app/img/**/*.png",
        "app/img/**/*.gif",
        "app/img/**/*.jpeg",
        "app/img/**/*.jpg",
        "app/img/**/*.svg"
    ])
        .pipe(copy('dist/img', {prefix: 999}));
});
gulp.task('copyFonts', ['cleanFonts'], function() {
    return gulp.src(["app/fonts/**/*.otf",
        "app/fonts/**/*.ttf",
        "app/fonts/**/*.eot",
        "app/fonts/**/*.woff",
        "app/fonts/**/*.woff2"
    ])
        .pipe(copy('dist/fonts', {prefix: 999}));
});


gulp.task('copy', ['copyImg', 'copyFonts']);

gulp.task('default', [ 'copyFonts', 'copyImg' , 'concat_css' ,'js', 'vendor_js', 'html', 'connect', 'watch']);

gulp.task('watch', function() {
    gulp.watch('app/style/**/*.sass', ['sass']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/img/**/*', ['copyImg']);
});


