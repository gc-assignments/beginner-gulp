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
  return gulp.src('./css/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'));
});
```

Now if you want to rename the file

*Google: gulp rename*

```
npm install gulp-rename --save-dev
```

```javascript
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename"); // new line
 
gulp.task('prefix', function() {
  return gulp.src('./css/style.css')
    .pipe(autoprefixer())
    .pipe(rename({ // new line
      prefix:'prefixed-'
    }))
    .pipe(gulp.dest('./dist'));
});
```

Now you can keep working on the original file and just run `gulp prefix` to
create the prefixed css file for production use.

If you think typing `gulp prefix` every time is a bit annoying, you can name your
task "default" instead and by typing `gulp`, it'll run the default task.

Like so:

```javascript
/* requies... */
 
gulp.task('default', function() { // changed 'prefix' to 'default'
  /* same... */
});
```

You can still run the task by task name like `gulp default`, but since it's the
default task, you can just type and run `gulp`.

If you still find typing `gulp` every time annoying, congrats! You're a true
programmer. Programmers are lazy by nature. That's why gulp has a function called
"watch"!

Syntax:

```javascript
gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
```

It automatically runs the task(s) every time you save the file!

```javascript
/* requires... */
 
gulp.task('prefix', function() { // change back to prefix
  return gulp.src('./css/style.css')
    .pipe(autoprefixer())
    .pipe(rename({
      prefix:'prefixed-'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() { // default task becomes watch task
  // the file you want to watch, and the array of tasks when
  // the watched file changes
  gulp.watch('./css/style.css', ['prefix']);
  // you can add more watch tasks
});
```

In fact, you can watch multiple files, lets make a copy of `style.css` and call
it `widget.css` and change the single file name to an array of files

```
cp css/style.css css/widget.css
```

```javascript
/* ... */

gulp.task('default', function() {
  // change './css/style.css' to ['./css/style.css', './css/widget.css']
  gulp.watch(['./css/style.css', './css/widget.css'], ['prefix']);
  // you can add more watch tasks
});
```

^C to stop and rerun `gulp` at the command prompt.

Now when you make changes to any of the 2 css files inside the css folder,
`prefix` task will be run, because we are watching both of them.

**Globbing**

Instead of using an array to, we could also use the `*` wildcard pattern like
`*.css`

So change the following line from:

```javascript
gulp.watch(['./css/style.css', './css/widget.css'], ['prefix']);
```

To:

```javascript
gulp.watch('./css/*.css', ['prefix']);
```

Stop and run `gulp` again.

Now instead of watching those 2 *SPECIFIC* css files,
*ANY* css file change in the css folder will trigger the `prefix` task!

### So far what we have learned
- require gulp and plugins
- create task with task name and callback function
- source file, pipe through plugin(s), and output file to a destination
- run gulp task by their name `gulp task-name`
- run default gulp task by just `gulp`
- watching files
- wildcard `*` globbing

Any questions so far?

## More Tasks! More Plugins!
You might have noticed that even tho we are watching both files, only one is
output to the `dist` folder. That's because we were only sourcing one file.

```
ls -la dist
```

Think about how to source multiple files...

If you think about an array or wildcard, then you're on the right track! It's a
pretty universal syntax in Gulp.

In order to source multiple file:

```javascript
gulp.task('prefix', function() {
  // single file: return gulp.src('./css/style.css')
  // since I'm lazy, I'll use wildcard instead of an array
  return gulp.src('./css/*.css')
    .pipe(autoprefixer())
    .pipe(rename({
      prefix:'prefixed-'
    }))
    .pipe(gulp.dest('./dist'));
});
```

Now when you run `gulp prefix`, it prefixes, rename, and output all the css
files (in this case 2) to the `dist` folder

And if you want to watch them, run the default task by just running `gulp`

### Trigger multiple tasks
As mentioned earlier, we can trigger more than just the `prefix` task in the 
watch function, let's try it with the demo (useless) tasks we wrote earlier

```javascript
gulp.task('one', function() {
  console.log('----> This is my first gulp task <----');
});

gulp.task('random', function() {
  var luckyNum = Math.random();
  console.log('Lucky random number ----->', luckyNum);
});

/* prefix task...*/

gulp.task('default', function() {
  gulp.watch('./css/*.css', ['prefix', 'one', 'random']);
});
```

Once you restart `gulp` and change any of the files (`style.css`, `widget.css`)
being watched, `prefix`, `one`, and `random` will all be run.

### Watch yourself!
Wouldn't be great if we don't have to restart `gulp` every time. 

With the power of Gulp, of course we can, let's let gulp watch itself.

```javascript
gulp.task('default', function() {
  gulp.watch('./css/*.css', ['prefix', 'one', 'random']);
  // when gulpfile.js changes, rerun default tasks
  gulp.watch('./gulpfile.js', ['default']); 
});
```

That's it. Now restart `gulp` and you don't have to restart it again when you
update your gulpfile.

### More useful plugins
So far we've only used one plugin `autoprefixer`, let's add some more useful
tasks.

```
npm i gulp-clean-css gulp-uglify gulp-concat --save-dev
```

Remember to Google gulp + task name if you don't remember their names

- `gulp-clean-css` is for minifying css files
- `gulp-uglify` is for uglifying JavaScript files
- `gulp-concat` is for combining to files into one.

After installation, remember to require the plugins

In your `./js` folder, `bootstrap.js` and `jquery.js` are included for demo
purpose.

```javascript
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
```

This time, instead of using default, I will name a task `assets` which triggers
both `css` and `js` taks.

Now run `gulp assets`, it should output `all.min.css` and `all.min.js` to the
dist folder. This time it's going to take longer because bootstrap and jquery 
JavaScript files are huge with more than 10k lines. But if you open `all.min.js`
you should see they are all compact and obviously not for human comprehension.

### Other things you can do with Gulp
- Watch and compile CSS preprocessors like SASS
- A better live reload with Browser-Sync
- Image assets optimization

Quick Demo

### Further Resources
- [CSS trick articel](https://css-tricks.com/gulp-for-beginners/)
- [Official Doc](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- [Recipes listed under the official doc](https://github.com/gulpjs/gulp/tree/master/docs/recipes)
