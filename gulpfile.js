// Step 1: Always require gulp
var gulp = require('gulp');
// Step 2: require more plugins
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");

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
  return gulp.src('css/style.css')
    .pipe(autoprefixer())
    .pipe(rename({
      prefix:'prefixed-'
    }))
    .pipe(gulp.dest('./css'));
});
