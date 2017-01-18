var gulp = require('gulp');

gulp.task('watch', function() {

    global.isWatching = true;
    gulp.watch(config.styles.bundle_styles.all, ['styles']);

});
