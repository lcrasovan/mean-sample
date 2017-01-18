var gulp = require('gulp'),                         
      rename = require('gulp-rename'),            
      cssfont64 = require('gulp-cssfont64');   

gulp.task('fonts', function() {
    return gulp.src(config.fonts.src)

        .pipe(cssfont64())
        .pipe(rename({
            prefix: "_font_"
          }))
        .pipe(gulp.dest(config.styles.src));
});
