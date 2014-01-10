var gulp = require('gulp');

// package.json
var pkg = require('./package.json');

//plugins
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

// tasks

// { concat & minify JS }
gulp.task('minify', function(){
  var scriptFiles = './assets/js/**/*.js';
  var scriptDist = './js';
  
  gulp.src(scriptFiles)
      .pipe(concat('all.js'))
      .pipe(gulp.dest(scriptDist))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(scriptDist));
});

// { sass }
gulp.task('sass', function() {
  var sassFiles = './assets/sass/**/*.sass';
  var sassDist = './css';

  gulp.src(sassFiles)
      .pipe(concat('main.sass'))
      .pipe(sass({unixNewlines: true, style: 'compressed'}))
      .pipe(gulp.dest('./css'));
});


// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('minify', 'sass');

  // Watch files and run tasks if they change
  gulp.watch('./assets/**/*', function() {
    gulp.run('minify');
    gulp.run('sass');
    
    console.log('------------- END -------------');
  });
});