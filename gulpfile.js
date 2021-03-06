var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  babel = require('gulp-babel');

gulp.task('watch', function() {
  gulp.watch('./routes/es2015/*.js', ['babel']);
});

gulp.task('babel', () => {
	return gulp.src('routes/es2015/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('routes'));
})

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'babel',
  'develop',
  'watch'
]);
