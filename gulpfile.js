var gulp = require('gulp');

// package.json
var pkg = require('./package.json');

//plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var minifyHTML = require('gulp-minify-html');



// tasks
gulp.task('build', function(){
 
  // { concat & minify JS }
  var scriptFiles = './assets/js/**/*.js';
  var scriptDist = './js';
  
  gulp.src(scriptFiles)
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


  // { html }
  var hmltFiles = './assets/html/**/*.html';
  var htmlDist = './';

  gulp.src(hmltFiles)
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDist));

});




// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('build');

  // Watch files and run tasks if they change
  gulp.watch('./assets/**/*', function() {
    gulp.run('build');
    
    console.log('------------- END -------------');
  });
});