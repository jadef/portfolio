// ---- Setup ----
// -- Dependencies
var browserSync = require('browser-sync'),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    del         = require('del'),
    fs          = require('fs'),
    gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    imagemin    = require('gulp-imagemin'),
    mustache    = require('gulp-mustache'),
    order       = require('gulp-order'),
    plumber     = require('gulp-plumber'),
    sequence    = require('gulp-sequence'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch');


// ---- Project Settings ----

// Allows gulp --dev to be run for a more verbose output
var isProduction    = true,
    sassStyle       = 'compressed',
    sourceMap       = false;

if (gutil.env.dev === true) {
    isProduction = false;
    sassStyle = 'expanded';
    sourceMap = true;
}

// ---- Tasks ----

// -- Clean up
gulp.task('clean', function() {
    del(['./public/**/*'],
        function (errors, paths) {
            console.log('Deleted compiled files/folders:\n', paths.join('\n'));
        }
    );
});

// -- Starter files
gulp.task('start', function() {
    return gulp.src(['./source/start/**/*'])
               .pipe(gulp.dest('public/'));
});

// -- Build Templates
gulp.task('templates', () => {
  var model = JSON.parse(fs.readFileSync('./source/model.json', 'utf8'));

  return gulp.src('./source/index.mustache')
             .pipe(plumber())
             .pipe(mustache(model, { extension: '.html' }))
             .pipe(gulp.dest('./public/'))
             .pipe(browserSync.reload({ stream: true }));
});

// -- Build JS
gulp.task('js', function(){
    console.log("Building scripts " + (isProduction ? "with" : "no") + " uglification...");

    gulp.src('./source/scripts/**/*.js')
        .pipe(order([
            // Control folder order this way
            'source/scripts/modernizr.js',
            'source/scripts/jquery.simplemodal.js',
            'source/scripts/retina.js',
            // Our custom onload last
            'source/scripts/onload.js',
            // Catch for any unaccounted for files
            'source/scripts/**/*.js'
        ], {base: './source/scripts/'}))
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(isProduction ? uglify({mangle: false, preserveComments: 'some'}) : gutil.noop())
        .pipe(isProduction ? gutil.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.reload({ stream: true }))
        .on('error', function (error) {
            console.log(error);
        });
});

// -- Build Images
gulp.task('images', function() {
    console.log("Building Images...");

    // TODO: don't rebuild if they exist

    gulp.src('./source/images/**/*')
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('./public/images/'))
        .pipe(browserSync.reload({ stream: true }))
        .on('error', function (error) {
            console.log(error);
        });
});

// -- Build CSS
// only builds primary project css
gulp.task('sass', function() {
    console.log("Building " + sassStyle + " Sass...");

    return gulp.src('./source/sass/styles.scss')
        .pipe(compass({
            config_file: './config.rb',
            sass: './source/sass/',
            css: './public/',
            style: sassStyle,
            sourcemap: sourceMap,
            comments: isProduction,
            debug: isProduction
        }))
        .pipe(browserSync.reload({ stream: true }))
        .on('error', function (error) {
            console.log(error);
        });
});

// ---- Watchers ----

// -- Watch and compile SASS changes
gulp.task('watch', ['build'], function() {
      browserSync({
        notify: false,
        port: 5050,
        server: {
          baseDir: ['./public/']
        }
      })

    //Watch SCSS and CSS for changes, compile compass
    gulp.watch('./source/index.mustache', ['templates']);
    gulp.watch('./source/templates/**/*.mustache', ['templates']);
    gulp.watch('./source/sass/**/*.scss', ['sass']);
    gulp.watch('./source/scripts/**/*.js', ['js']);
    gulp.watch('./source/images/**/*', ['images']);
    gulp.watch('./source/model.json', ['templates']);

});

gulp.task('default', ['watch']);

// ---- Builders ----
gulp.task('compile', sequence('clean', ['js', 'images', 'sass'], 'templates', 'start'));
gulp.task('build', sequence('images', 'js', 'sass', 'templates'));
