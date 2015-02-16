// include gulp
var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');



/*var minifyCSS = require('gulp-minify-css');
var ename    = require('gulp-rename'); // to rename any file*/

// include plug-ins
var jshint = require('gulp-jshint');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './assets/img/**/*',
      imgDst = './build/assets/img/';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// include plug-ins
var minifyHTML = require('gulp-minify-html');

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './*.html',
      htmlDst = './build';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./assets/js/lib.js','./assets/js/*.js'])

    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/assets/js/'));
});

// CSS concat, auto-prefix and minify
/*gulp.task('styles', function() {
  gulp.src(['./assets/css/*.css'])
    .pipe(concat('base.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/assets/css/'));
});*/

gulp.task('sass', function () {
    gulp.src('./assets/css/base.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/assets/css/'));
});

/*gulp.task('sass', function () {
    gulp.src('./assets/css/base*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(concat('base.css'))
        .pipe(gulp.dest('./'))
        .pipe(minifyCSS())
        .pipe(rename('base.css'))
        .pipe(gulp.dest('./build/assets/css/'));
});

gulp.task('default', ['sass']);*/

// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'sass'], function() {
});

// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'sass'], function() {
  // watch for HTML changes
  gulp.watch('./*.html', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  gulp.watch('./assets/js/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./assets/css/*.scss', function() {
    gulp.run('sass');
  });
});


