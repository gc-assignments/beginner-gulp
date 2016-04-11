// Step 1: Always require gulp
var gulp = require('gulp');
// Step 2: require more plugins
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// Step 3: write tasks
gulp.task('one', function() {
  console.log('----> This is my first gulp task <----');
});

gulp.task('random', function() {
  var luckyNum = Math.random();
  console.log('Lucky random number ----->', luckyNum);
});

// More useful Task
gulp.task('prefix', function() {
  return gulp.src('./css/*.css')
    .pipe(autoprefixer())
    .pipe(rename({
      prefix:'prefixed-'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {
  return gulp.src('./css/*.css')
    .pipe(concat('all.css')) // combine css into a single file called all.js
    .pipe(autoprefixer()) // auto prefix css for all.css
    .pipe(minify()) // minify all.css
    .pipe(rename({
      suffix: '.min' // change all.css to all.min.css
    }))
    .pipe(gulp.dest('./dist')); // output it to the dist folder
});

gulp.task('js', function() {
  // sourcing it with an array because I care about the order
  return gulp.src(['./js/jquery.js', './js/bootstrap.js'])
    .pipe(concat('all.js')) // combine all js into a single file called all.js
    .pipe(uglify()) // uglify js
    .pipe(rename({
      suffix: '.min' // change all.js to all.min.js
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('assets', ['css', 'js']);

gulp.task('default', function() {
  // gulp.watch(['./css/style.css', './css/widget.css'], ['prefix']);
  gulp.watch('./css/*.css', ['prefix', 'one', 'random']);
  gulp.watch('./gulpfile.js', ['default']);
});
