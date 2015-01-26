var gulp = require('gulp');
var gutil = require('gulp-util');

// package.json
var pkg = require('./package.json');

//plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var sitemap = require('gulp-sitemap');
var minifyHtml = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var map = require('map-stream');
var notify = require("gulp-notify");

// jshint reporter
var myReporter = map(function(file, cb) {

    if (!file.jshint.success) {
        gutil.log(gutil.colors.yellow.bgRed('JSHINT fail in ' + file.path));

        file.jshint.results.forEach(function(err) {
            if (err) {
                gutil.log(gutil.colors.red(' ' + file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason));
            }
        });
    }

    if (file.jshint.errorCount !== undefined) {
        gutil.log(gutil.colors.green('Your project have ' + file.jshint.errorCount + ' errors...'));
    } else {
        gutil.log(gutil.colors.green(' -- Your project have 0 errors...'));
    };

    cb(null, file);
});

// tasks
gulp.task('build', function() {

    // { concat, minify & jshint }
    var scriptFiles = './assets/js/**/*.js';
    var scriptDist = './js';

    gulp.src(scriptFiles)
        .pipe(jshint())
        .pipe(myReporter)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(scriptDist))
        .pipe(notify({
            "title": "Javascript Build",
            "message": "Build with success! file <%= file.relative %>",
        }));

    // { sass }
    var sassFiles = './assets/sass/all.sass';
    var sassDist = './css';

    gulp.src(sassFiles)
        .pipe(concat('all.min.sass'))
        .pipe(sass({
            unixNewlines: true,
            style: 'compressed'
        }))
        .pipe(gulp.dest(sassDist))
        .pipe(notify({
            "title": "Sass Build",
            "message": "Build with success! file <%= file.relative %>",
        }));       

    // { image optimizer }
    var imageFiles = './assets/img/**/*';
    var imageDist = './img';
    gulp.src(imageFiles)
        .pipe(imagemin())
        .pipe(gulp.dest(imageDist));

    // { html }
    var htmlFiles = './assets/html/**/*.html';
    var htmlDist = './';
    gulp.src(htmlFiles)
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlDist))
        .pipe(sitemap())
        .pipe(gulp.dest(htmlDist))
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
    gulp.run('build');

    // Watch files and run tasks if they change
    gulp.watch('./assets/**/*', function() {
        var date = new Date(),
            hour = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            buildTime = hour + ':' + minutes + ':' + seconds;

        gulp.run('build', function() {
            gutil.log(gutil.colors.blue('------------- Built! -------------'), gutil.colors.green('( Last time -', buildTime, ')'));
        });

    });
});
