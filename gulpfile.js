// ---- Setup ----
// -- Dependencies
var gulp = require('gulp'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    compass = require('gulp-compass'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    order = require('gulp-order'),
    sequence = require('gulp-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin');

// ---- Project Settings ----

// Allows gulp --dev to be run for a more verbose output
var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;
var isWatching = false;

if (gutil.env.dev === true) {
    sassStyle = 'expanded';
    sourceMap = true;
    isProduction = false;
}

// ---- Tasks ----

// -- Clean up
gulp.task('clean', function() {
    del(['public/scripts/*',
        'public/images/*',
        'public/styles/*'], function (errors, paths) {

        console.log('Deleted compiled files/folders:\n', paths.join('\n'));
    });
});

// -- Build JS
gulp.task('js', function(){
    console.log("Building scripts " + (isProduction ? "with" : "no") + " uglification...");

    gulp.src('source/scripts/**/*.js')
        .pipe(order([
            // Control folder order this way
            'source/scripts/modernizr.js',
            'source/scripts/jquery.simplemodal.js',
            'source/scripts/retina.js',
            // Our custom onload last
            'source/scripts/onload.js',
            // Catch for any unaccounted for files
            'source/scripts/**/*.js'
        ], {base: 'source/scripts/'}))
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(isProduction ? uglify({mangle: false, preserveComments: 'some'}) : gutil.noop())
        .pipe(isProduction ? gutil.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest('public/scripts/'))
        .on('error', function (error) {
            console.log(error);
        });
});

// -- Build Images
gulp.task('images', function() {
    console.log("Building Images...");

    // TODO: don't rebuild if they exist

    gulp.src('source/images/**/*')
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('public/images'))
        .on('error', function (error) {
            console.log(error);
        });
});

// -- Build CSS
// only builds primary project css
gulp.task('sass', function() {
    console.log("Building " + sassStyle + " Sass...");

    return gulp.src('source/sass/main.scss')
        .pipe(compass({
            config_file: 'config.rb',
            sass: 'source/sass',
            css: 'public/styles',
            style: sassStyle,
            sourcemap: sourceMap,
            comments: isProduction,
            debug: isProduction
        }))
        .on('error', function (error) {
            console.log(error);
        });
});

// ---- Utility Tasks ----

// -- Livereload
gulp.task('livereload', function() { livereload.changed(); });

// ---- Watchers ----

// -- Watch and compile SASS changes
gulp.task('watch', ['build'], function() {
    isWatching = true;
    livereload.listen();

    //Watch SCSS and CSS for changes, compile compass and run livereload on change
    gulp.watch('source/sass/**/*.scss', ['sass']);
    gulp.watch('source/scripts/**/*.js', ['js']);
    gulp.watch('public/scripts/**/*.js', livereload.changed);
    gulp.watch('source/images/**/*', ['images']);
    gulp.watch('public/styles/**/*.css', livereload.changed);

});

gulp.task('default', ['watch']);

// ---- Builders ----
gulp.task('compile', sequence('clean', ['js', 'images'], 'sass'));
gulp.task('build', sequence('images', 'js', 'sass'));
