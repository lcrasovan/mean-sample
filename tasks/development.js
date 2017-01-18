var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    environments = require('gulp-environments');

gulp.task('dev', ['clean'], function(cb){

    cb = cb || function() {};

    global.production = environments.production;
    global.development = environments.development;

    environments.current(development);

    global.env = 'dev';

    runSequence(['styles', 'fonts' ], 'index', 'watch', cb);
});
