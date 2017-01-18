var gulp = require('gulp'),
    replace = require('gulp-replace'),
    gulpif = require('gulp-if'),
    fs = require('fs');

gulp.task('index', function () {

  var config = require('your_asset_config.json');

  return gulp.src(config.mainHTML)
      .pipe(gulpif(global.env == 'prod', replace('/css/main.css', config.assetsBaseUrl + 'css/main.css?' + config.assetsVersion)))
      .pipe(gulpif(global.env == 'prod', replace('/css/unsupported.css', config.assetsBaseUrl + 'css/unsupported.css?' + config.assetsVersion)))
      .pipe(gulpif(global.env == 'prod', replace('/js/core.js', config.assetsBaseUrl + 'js/core.js?' + config.assetsVersion)))
      .pipe(gulp.dest(config.buildDir));
});
