import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import size from 'gulp-size';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import del from 'del';

const libraryDest = 'dist';

gulp.task('clean', () => del([libraryDest]));

gulp.task('css:compile', () =>
  gulp
    .src('src/index.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      sass({
        precision: 10,
        includePaths: ['../../node_modules'],
      }).on('error', sass.logError)
    )
    .pipe(rename({ basename: 'ocean' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(size())
    .pipe(gulp.dest(libraryDest))
);

gulp.task('css:minify', () =>
  gulp
    .src('dist/ocean.css')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(size())
    .pipe(gulp.dest(libraryDest))
);

gulp.task('css', gulp.series('css:compile', 'css:minify'));

gulp.task('watch', () => {
  gulp.watch('src/**/*.scss', gulp.series('css:compile'));
});

gulp.task('default', gulp.series('clean', 'css'));
