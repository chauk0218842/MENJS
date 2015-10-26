'use strict';

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import path from 'path';

gulp.task('lint', function () {
  return gulp.src(path.join('src/**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('serve', function (options) {
  const config = {
    script: path.join(__dirname, 'src', 'app.es5.js'),
    ext: 'src/**/*.js',
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
  gulp.src('./src/**/*.spec.js')
    .pipe(mocha({
      reporter: 'spec',
      clearRequireCache: true,
      ignoreLeaks: true,
      require: ['./src/specs/helpers/chai']
    }))
    .once('error', function () {
      process.exit(1);
    });
});

gulp.task('default', ['lint', 'test', 'serve']);
gulp.task('watch', ['lint', 'test']);
