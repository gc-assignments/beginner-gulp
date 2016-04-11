// Step 1: Always require gulp
var gulp = require('gulp');
// Step 3: require more plugins
var autoprefixer = require('autoprefixer'); 

// Step 2: write tasks
gulp.task('first', function() {
  console.log('my first task');
});

gulp.task('random', function() {
  var luckyNum = Math.random();
  console.log(luckyNum);
});

gulp.task('prefix', function() {
  return gulp.src('./css/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'));
});
