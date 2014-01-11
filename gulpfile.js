var gulp = require('gulp');

// package.json
var pkg = require('./package.json');

//plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var minifyHtml = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var map = require('map-stream');


// jshint reporter
var myReporter = map(function (file, cb) {

  if (!file.jshint.success) {
    console.log('JSHINT fail in ' + file.path);
    file.jshint.results.forEach(function (err) {
      if (err) {
        console.log(' '+ file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
      }
    });
  }

  if (file.jshint.errorCount !== undefined) {
    console.log('Your project have ' + file.jshint.errorCount + ' errors...');  
  } else{
    console.log('Your project have 0 errors...');  
  };
  
  cb(null, file);
});


// tasks
gulp.task('build', function(){
 
  // { concat, minify & jshint }
  var scriptFiles = './assets/js/**/*.js';
  var scriptDist = './js';
  
  gulp.src(scriptFiles)
      .pipe(jshint())
      .pipe(myReporter)
      .pipe(concat('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(scriptDist));


  // { sass }
  var sassFiles = './assets/sass/all.sass';
  var sassDist = './css';

  gulp.src(sassFiles)
      .pipe(concat('all.min.sass'))
      .pipe(sass({unixNewlines: true, style: 'compressed'}))
      .pipe(gulp.dest('./css'));


  // { image optimizer }
  var sassFiles = './assets/img/**/*';
  var sassDist = './img';
  gulp.src(sassFiles)
        .pipe(imagemin())
        .pipe(gulp.dest(sassDist));


  // { html }
  var hmltFiles = './assets/html/**/*.html';
  var htmlDist = './';

  gulp.src(hmltFiles)
    .pipe(minifyHtml())
    .pipe(gulp.dest(htmlDist));

});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('build');

  // Watch files and run tasks if they change
  gulp.watch('./assets/**/*', function() {
    var date = new Date(), hour = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(),
        buildTime = hour + ':' + minutes + ':' + seconds;

    gulp.run('build');

    console.log('------------- END -------------', buildTime);
  });
});