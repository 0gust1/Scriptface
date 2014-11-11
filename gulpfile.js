var gulp= require('gulp'),
    livereload = require('gulp-livereload'),
    connect= require('gulp-connect'),
    dest = 'build';

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', ['server'], function() {
  var server = livereload();
  gulp.watch(dest + '/**').on('change', function(file) {
      server.changed(file.path);
  });
});
