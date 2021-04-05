var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var cssdeclsort = require('css-declaration-sorter');
var mqpacker = require('css-mqpacker');
var rename = require( 'gulp-rename' );

gulp.task('sass', function() {
  return gulp.src( './**/sass/*.scss' )
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false
    }))
    .pipe(postcss([cssdeclsort({order: 'alphabetically'})]))
    .pipe(postcss([mqpacker()]))
    .pipe(rename(function(path){
      path.dirname = path.dirname.replace( 'sass', 'css');
    }))
    .pipe(sourcemaps.write('./_cssmap'))
    .pipe(gulp.dest( '.' ));
});

gulp.task('watch', function() {
  gulp.watch('./**/sass/**/*.scss', gulp.task('sass'));
});

gulp.task('default', gulp.task('sass'),function(){
  gulp.start('watch');
  done();
});