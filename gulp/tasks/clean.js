const gulp = require('gulp');
const del = require('del');

const conf = require('../conf').clean;

gulp.task('clean-dst', cb => {
  del(conf.dst.path).then(() => {
    cb();
  });
});

gulp.task('clean-build', cb => {
  del(conf.build.path).then(() => {
    cb();
  });
});
