const gulp = require('gulp');
const browserSync = require('browser-sync');

const conf = require('../conf').serve;

gulp.task('serve', () => {
  browserSync(conf.dst);
});

gulp.task('serve-build', () => {
  browserSync(conf.build);
});
