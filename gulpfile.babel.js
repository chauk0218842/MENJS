'use strict';

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import path from 'path';

gulp.task('lint', function () {
  return gulp.src(path.join ('src/**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('server', function (options) {
  const config = {
    script: path.join(__dirname, 'src', 'server.es5.js'),
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    },
    tasks: 'watch'
  };

  return nodemon(config)
    .on('change', (options && options.onChange) || [])
    .on('restart', function () {
      console.log('--- Restarting the server ---');
    })
});

gulp.task('test', function () {
  //gulp.src('**/*.spec.js')
  //  .pipe(mocha({
  //    reporter: 'nyan',
  //    clearRequireCache: true,
  //    ignoreLeaks: true
  //  }));
});

gulp.task('default', ['lint', 'test', 'server']);
gulp.task('watch', ['lint', 'test']);
