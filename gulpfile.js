var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');


gulp.task('scss', function() {
    return gulp.src('sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass ({
            errLogConsole: true,
            outputStyle: 'nested',
            sourceComments: false,
        }).on("error", sass.logError))
		.pipe(autoprefixer({
				browsers:  [
					'last 3 chrome versions',
					'last 3 firefox versions',
					'last 3 opera versions',
					'last 3 safari versions',
					'last 3 ios versions',
					'android >= 4.0',
					'ie >= 10' 	// change to `last 3 ie versions` after IE12  release.
				]
			}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css'))

})
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['js']);        
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['scss'], function() {
    gulp.watch('sass/style.scss', ['scss'])
});
