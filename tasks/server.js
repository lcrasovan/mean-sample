/*
Could be used when FRONT is separated by BACKEND and browserify is used
 */

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    livereload = require('gulp-livereload'),
    platform = require('platform'),
    WEB_PORT = 3000,
    DEV_DIR = 'build';

gulp.task('server', function() {

    livereload({ start: true });

    global.env = 'dev';
    
    connect.server({
        root: DEV_DIR,
        port: WEB_PORT,
        host: 'you_localhost_name',
        livereload: true,
        fallback: DEV_DIR + '/index.html'
    });

    console.log('Server listening on http://localhost:' + WEB_PORT);
});
