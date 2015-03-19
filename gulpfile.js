var cache = require('gulp-cached');
var gulp = require('gulp');
var p = require('./package.json');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
// JS
var closureCompiler = require('gulp-closure-compiler');
var gjslint = require('gulp-gjslint');
// CSS
var autoprefixer = require('autoprefixer-core');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');


gulp.task('default', function() {
  gulp.src('src/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint())
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions'] })
    ]))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('.'));

  gulp.src('src/*.js')
    .pipe(gjslint())
    .pipe(gjslint.reporter('console'), {fail: true})
    .pipe(cache('closureCompiler'))
    .pipe(closureCompiler({
      compilerPath: '../../compiler.jar',
      compilerFlags: {
        js: '../../closure-library',
        closure_entry_point: 'sv.Gallery',
        only_closure_dependencies: true
      },
      fileName: p.name + '.min.js'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.scss', ['default']);
  gulp.watch('src/*.js', ['default']);
});
