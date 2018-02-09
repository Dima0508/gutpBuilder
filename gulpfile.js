"use strict";
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    cache = require('gulp-cache'),
    flatten = require('gulp-flatten'),
    clean = require('gulp-clean'),
    del = require('del'),
    browserSync = require('browser-sync'),
    watch = require('gulp-watch'),
    changed = require('gulp-changed'),
    //pug
    pug = require('gulp-pug'),
    pugBeautify = require('gulp-pug-beautify'),
    //js
    uglify = require('gulp-uglify'),
    //img
    imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    //sass
    sass = require('gulp-sass'),
    sourcemap = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer');

var path = {
    vendor:{
        css: [
            'bower_components/reset.scss/reset.css',
            'bower_components/normalize-css/normalize.css'
        ],
        js: [
            'bower_components/jquery/dist/jquery.min.js'
        ]
    },

    common: {
        css: [
            'app/css/**/main.css',
            'app/css/**/*.css'
        ],
        js: [
            'app/pug/**/*.js'
        ]
    },

    copy: {
        other: 'app/*.*',
        fonts: 'app/fonts/**/*.*'
    },

    app: {
        pug: 'app/pug/*.pug',
        scss: 'app/pug/**/*.scss',
        img: 'app/img/**/*.*',
        css: 'app/css/',
        fonts: 'app/fonts/**/*.*'
    },
    dist: {
        main: 'dist',
        html: 'dist/',
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/img',
        fonts: 'dist/fonts'
    },

    clean: {
       build: [
           'dist/',
           'app/css/'
       ]
    },

    watch: {
        pug: ['app/pug/**/*.pug'],
        sass: [
            'app/pug/**/*.scss',
            'app/scss_helper/**/*.scss'
        ],
        img: ['app/img/**/*.*'],
        fonts: ['app/fonts/**/*.*'],
        cssCommon: ['app/css/**/*.css'],
        cssVendor: ['bower_components/**/*.css'],
        jsVendor: ['bower_components/**/*.js'],
        jsCommon: ['app/pug/**/*.js'],
        browserReload: ['dist']
    }
};

//pug convert
gulp.task('pug', function(){
    return gulp.src(path.app.pug)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "PUG ERROR"
            })}))
        .pipe(changed(path.dist.html))
        .pipe(pug({
            pretty: true
        }))
        .pipe(pugBeautify({
            omit_empty: true,
            tab_size: 4
        }))
        .pipe(gulp.dest(path.dist.html))
        .pipe(browserSync.reload({stream: true}))
});

//sass convert
gulp.task('sass', function () {
    return gulp.src(path.app.scss)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "SASS ERROR"
            })}))
        .pipe(changed(path.app.css))
        .pipe(sourcemap.init())
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest(path.app.css))
        .pipe(browserSync.reload({stream: true}))
});

//common css
gulp.task('cssCommon:concat', ['sass'] , function() {
    return gulp.src(path.common.css)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "CSS COMMON CONCAT ERROR"
            })}))
        .pipe(changed(path.dist.css))
        .pipe(sourcemap.init({loadMaps: true}))
        .pipe(concat('common.min.css'))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.reload({stream: true}));
});

//vendor css
gulp.task('cssVendor:concat', function() {
    return gulp.src(path.vendor.css)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "CSS VENDOR CONCAT ERROR"
            })}))
        .pipe(changed(path.dist.css))
        .pipe(sourcemap.init({loadMaps: true}))
        .pipe(concat('vendor.min.css'))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.reload({stream: true}));
});

//vendor min js
gulp.task('jsVendor:concat', function() {
    return gulp.src(path.vendor.js)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "JS VENDOR CONCAT ERROR"
            })}))
        .pipe(changed(path.dist.js))
        .pipe(sourcemap.init())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.reload({stream: true}));
});

//common min js
gulp.task('jsCommon:concat', function() {
    return gulp.src(path.common.js)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "JS COMMON CONCAT ERROR"
            })}))
        .pipe(changed(path.dist.js))
        .pipe(sourcemap.init())
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.reload({stream: true}));
});

//img min
gulp.task('imgmin', function() {
    return gulp.src(path.app.img)
        .pipe(plumber({errorHandler: notify.onError({
                message: "Error: <%= error.message %>",
                title: "IMGMIN ERROR"
            })}))
        .pipe(changed(path.dist.img))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imageminJpegRecompress({
                loops: 5,
                min: 80,
                max: 95,
                quality:'medium'
            }),
            imagemin.svgo(),
            imagemin.optipng({optimizationLevel: 3}),
            pngquant({quality: '80-95', speed: 5})
        ],{
            verbose: true
        }))
        .pipe(gulp.dest(path.dist.img))
        .pipe(browserSync.reload({stream: true}));
});

// copy fonts
gulp.task('copyFonts', function() {
    return gulp.src(path.copy.fonts)
        .pipe(changed(path.dist.fonts))
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(browserSync.reload({stream: true}));
});
// copy other
gulp.task('copyOther', function() {
    return gulp.src(path.copy.other)
        .pipe(changed(path.dist.main))
        .pipe(gulp.dest(path.dist.main))
        .pipe(browserSync.reload({stream: true}));
});

//clean
gulp.task('cleanDist', function() {
    return del.sync(path.clean.build); // Удаляем папку dist перед сборкой
});

// browser sync
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

// build
gulp.task('build', [
    'cleanDist',
    'pug',
    'cssVendor:concat',
    'cssCommon:concat',
    'jsVendor:concat',
    'jsCommon:concat',
    'copyFonts',
    'copyOther',
    'imgmin'],
    function(){
        console.log('Build Complete !!!');
});
// watch
gulp.task('watch', [
    'browser-sync',
    'pug',
    'cssVendor:concat',
    'cssCommon:concat',
    'jsVendor:concat',
    'jsCommon:concat',
    'copyFonts',
    'copyOther',
    'imgmin'
    ], function(){
    watch(path.watch.pug, function(event, cb) {
        gulp.start('pug');
    });
    watch(path.watch.sass, function(event, cb) {
        gulp.start('sass');
    });
    watch(path.watch.cssCommon, function(event, cb) {
        gulp.start('cssCommon:concat');
    });
    watch(path.watch.cssVendor, function(event, cb) {
        gulp.start('cssVendor:concat');
    });
    watch(path.watch.jsCommon, function(event, cb) {
        gulp.start('jsCommon:concat');
    });
    watch(path.watch.jsVendor, function(event, cb) {
        gulp.start('jsVendor:concat');
    });
    watch(path.watch.fonts, function(event, cb) {
        gulp.start('copyFonts');
    });
    watch(path.copy.other, function(event, cb) {
        gulp.start('copyOther');
    });
    watch(path.watch.img, function(event, cb) {
        gulp.start('imgmin');
    });
    // watch(path.watch.browserReload, function(event, cb) {
    //     ///////////////////
    // });
});
//default
gulp.task('default',['watch']);
