var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    environments = require('gulp-environments');

gulp.task('prod', ['clean'], function(cb) {

    cb = cb || function() {};

    global.production = environments.production;
    global.development = environments.development;

    environments.current(production);

    global.env = 'prod';
    runSequence(['images'], ['styles', 'fonts'], 'index', cb);
});
