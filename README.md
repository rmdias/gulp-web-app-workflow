Gulp Web App Workflow
======================

###### Boilerplate from web app using Gulp.JS

![Class Gulp](http://rmdias.com/images/subdomains/gulpworkflow/gulp-logo.png)

> gulp.js - The streaming build system

## We use:

* [HTML5 - Boilerplate](https://github.com/h5bp/html5-boilerplate)
* [Gulp - Minify - Html](https://npmjs.org/package/gulp-minify-html)
* [Gulp - Concat](https://npmjs.org/package/gulp-concat)
* [Gulp - Imagemin](https://npmjs.org/package/gulp-imagemin)
* [Gulp - Ruby - Sass](https://npmjs.org/package/gulp-ruby-sass)
* [Gulp - Uglify](https://npmjs.org/package/gulp-uglify)
* [Gulp - JSHint](https://npmjs.org/package/gulp-jshint)
* [Gulp - Map - Stream](https://npmjs.org/package/map-stream‎)


## Usage

1. Clone this repository:
  	
		https://github.com/rmdias/gulp-web-app-workflow.git


2. Install Gulp dependencies:

		npm install


* And now you already have the gulp workflow installed \o/


## Folders Structure

Your editable files are in <b> /assets </b> folder. And content of folders that are in index will be generated automatically.


The basic structure of the project is:

<pre>
.
|--/assets
|--|--/html
|--|--/sass
|--|--/js
|--|--/img
|--/css
|--/fonts
|--/img
|--/js
|--index.html
|--package.json
|--gulpfile.js
</pre>



## The package.json

<pre>
{
  "name": "Gulp-web-app-workflow",
  "version": "0.0.1",
  "description": "Boilerplate from web app using Gulp.JS",
  "main": "index.html",
  "author": "Rodolfo Dias",
  "license": "BSD",
  "devDependencies": {
    "gulp-util": "~2.2.9",
    "gulp-uglify": "~0.1.0",
    "gulp-sass": "~0.2.3",
    "gulp-concat": "~2.1.7",
    "gulp-ruby-sass": "~0.1.1",
    "gulp-minify-html": "~0.1.0",
    "gulp-imagemin": "~0.1.4",
    "gulp-jshint": "~1.3.4",
    "map-stream": "~0.1.0"
  }
}
</pre>





## The gulpfile.js

Any file that you put in your production folder will be compiled automatically. HTML, SASS, JS or images does not matter.


<pre>
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
</pre>
<br>
<br>

# And now is only run the gulp and be happy

		gulp

<br>
<br>
## Contributing

Check [CONTRIBUTING.md](https://github.com/rmdias/gulp-web-app-workflow/blob/master/CONTRIBUTING.md).

<br>
<br>
<br>
