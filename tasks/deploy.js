var gulp = require('gulp'), 
    fs = require('fs');

gulp.task('deploy', function() {

    global.env = 'prod';

  var awsCredentials = JSON.parse(fs.readFileSync('./config/aws.json'));
  var s3 = require('gulp-s3-upload')({
    region: awsCredentials.region
  });

  gulp.src('./build/**')
      .pipe(s3({
          Bucket: awsCredentials.bucket, 
          ACL:    'public-read'  
      }, {
          maxRetries: 5
      }))
  ;

  return;
});