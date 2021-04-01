import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import size from 'gulp-size';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import del from 'del';

const libraryDest = 'dist';

gulp.task('clean', () => del([libraryDest]));

gulp.task('css', () =>
  gulp
    .src('src/index.scss')
    .pipe(plumber())
    .pipe(
      sass({ includePaths: ['../../node_modules'] }).on('error', sass.logError)
    )
    .pipe(rename({ basename: 'ocean-ui', suffix: '.min' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(size())
    .pipe(gulp.dest(libraryDest))
);

gulp.task('default', gulp.series('clean', 'css'));
