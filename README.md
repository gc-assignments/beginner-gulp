## Step 1 - Install Gulp

- Make sure to have node installed.
- Check if you have Gulp installed already `gulp -v`
- If you don't see the version number, run the following line to install Gulp.

```
npm install gulp-cli -g
```
**Note**: Mac users might need the sudo keyword

- `-g` flag means global, so `gulp` command can be used everywhere

## Step 2 - Create a project

### 1 find a place to start
Create a folder if you haven't, called something meaningful to you.

Will make ours `beginner-gulp`, and change into that folder, use either command
line or GUI.

```
mkdir learn-gulp; cd $_
```

### 2 npm init
Run `npm init` to create a `package.json` file so you can keep track of your
installed dependencies (the ones that are installed in `node_modules` folder).

**Note**: if using Git, add `node_modules` to your `.gitignore` file so that
you use `package.json` to keep track of your dependencies instead of Git
([example](https://github.com/gc-assignments/beginner-gulp/blob/master/.gitignore)).

### 3 install gulp to project
```
npm install gulp --save-dev
```
`--save-dev` means save `gulp` as a dev dependency in `package.json`

### 4 create gulpfile
If you want to run gulp, you have to have a file called `gulpfile.js` in the root
of your project.

(You can try to run `gulp` in your command line without `gulpfile.js` and see
what it says)

It stores all the tasks you can run, which are created and configured by you or
others.

## Step 3 - Start Using Gulp

### Writing Gulp Tasks inside gulpfile.js

```javascript
var gulp = require('gulp');
```
Consists of task name and the stuff inside the callback function

```javascript
gulp.task('task-name', function() {
  // task configs
});
```
Essentially gulp is just JavaScript that runs on your computer, which is Node.

```javascript
gulp.task('one', function() {
  console.log('----> This is my first gulp task <----');
});

gulp.task('random', function() {
  var luckyNum = Math.random();
  console.log('Lucky random number ----->', luckyNum);
});
```

### More complex tasks

Now imagine inside that function block, you write some functions to

- locate and open a css file
- write another function to minify the css file
- and then rename and save the minified css file somewhere you want

Sounds pretty hard to do if you write from scratch. Luckily, gulp provides an
easy to use boilerplate syntax, and all kinds of functions can come from plugins.

```javascript
gulp.task('task-name', function() {
  return gulp.src('source-files') // locate source files
    .pipe(gulpPluginSomeoneWrote()) // sends the files through a gulp plugin
    .pipe(gulp.dest('destination')); // outputs file to a destination
});
```

**Let's try Autoprefixer**  
Using autoprefixer this way keeps your CSS file clean and easier to maintain.
And you don't have to manually add anything every time you update your css files.
([Online Autoprefixer](https://autoprefixer.github.io/) in comparison)

*Google: gulp autoprefixer*

```
npm install gulp-autoprefixer --save-dev
```

```javascript
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('prefix', function() {
  return gulp.src('css/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'));
});
```

Now the original file is all messed up, defeating the purpose of using gulp
autoprefixer mentioned earlier. Wouldn't it be great if there's some plugin that
can...

*Google: gulp rename*

```
npm install gulp-rename --save-dev
```

```javascript
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename"); // new line
 
gulp.task('prefix', function() {
  return gulp.src('css/style.css')
    .pipe(autoprefixer())
    .pipe(rename({ // new line
      prefix:'prefixed-'
    }))
    .pipe(gulp.dest('./css'));
});
```

Now you can keep working on the original file and just run `gulp prefix` to
create the prefixed css file for production use.

If you think typing `gulp prefix` every time is quite annoying, you can name your
task "default" instead and by typing `gulp`, it'll run the default task.

Like so:

```javascript
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename"); 
 
gulp.task('default', function() { // changed 'prefix' to 'default'
  return gulp.src('css/style.css')
    .pipe(autoprefixer())
    .pipe(rename({ 
      prefix:'prefixed-'
    }))
    .pipe(gulp.dest('./css'));
});
```

You can still run the task by task name like `gulp default`, but since it's the
default task, you can just type and run `gulp`.
