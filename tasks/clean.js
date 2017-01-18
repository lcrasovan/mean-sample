var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(){
    console.log('Cleaning directories...');

    del.sync([
        'temp/**',
        '!temp',
        'build/**',
        '!build'
    ]);
    
});