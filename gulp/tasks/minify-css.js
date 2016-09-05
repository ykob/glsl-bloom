const gulp = require('gulp');

const $ = require('../plugins');
const conf = require('../conf').minify_css;

gulp.task('minify-css', () => {
  return gulp.src(conf.src)
    .pipe($.minifyCss())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(conf.dest));
});
