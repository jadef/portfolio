// ------ Setup ------

// -- Dependencies
var browserSync = require('browser-sync'), // Browser Sync
    del         = require('del'), // Delete
    fs          = require('fs'), // File System
    gulp        = require('gulp'), // Base Gulp
    autoprefixer= require('gulp-autoprefixer'), // Autoprefix css
    compass     = require('gulp-compass'), // Compass - Compile Sass
    concat      = require('gulp-concat'), // Concatinate files
    imagemin    = require('gulp-imagemin'), // Process Images
    mustache    = require('gulp-mustache'), // Interpolate mustache files
    order       = require('gulp-order'), // Order files
    plumber     = require('gulp-plumber'), // Pipe error patch
    sassLint    = require('gulp-sass-lint'), // Linting of Sass
    sequence    = require('gulp-sequence'), // Order tasks
    sourcemaps  = require('gulp-sourcemaps'), // JS/CSS sourcemaps
    uglify      = require('gulp-uglify'), // JS minification
    gutil       = require('gulp-util'), // Various utilities like colors and noop
    watch       = require('gulp-watch'); // Watching files


// ------ Project Settings ------

var source          = './source/',
    dest            = './public/',
    isProduction    = false,
    browserlist     = ['last 2 versions'],
    sassStyle       = 'expanded',
    sourceMap       = true;

// Allows gulp --prod to be run for the compressed output
if (gutil.env.prod === true) {
    isProduction    = true;
    sassStyle       = 'compressed';
    sourceMap       = false;
}


// ------ Tasks ------

// -- Clean up
gulp.task('clean', function() {
  del([dest + '**/*']).then( paths => {
    gutil.log(gutil.colors.yellow.bold('Deleted compiled files/folders:\n'), paths.join('\n'));
  });
});

// -- Starter files
gulp.task('start', function() {
  return gulp.src([source + 'start/**/*'])
    .pipe(gulp.dest(dest));
});

// -- Build Templates
gulp.task('templates', function() {
  var model = JSON.parse(fs.readFileSync(source + 'model.json', 'utf8'));

  return gulp.src(source + 'index.mustache')
    .pipe(plumber())
    .pipe(mustache(model, { extension: '.html' }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({ stream: true }));
});

// -- Build JS
gulp.task('js', function() {

  gutil.log("Building scripts " + gutil.colors.yellow((isProduction ? "with" : "without")) + " uglification...");

  gulp.src(source + 'scripts/**/*.js')
      .pipe(order([
        // Control folder order this way
        'source/scripts/modernizr.js',
        'source/scripts/jquery.simplemodal.js',
        'source/scripts/retina.js',
        // Our custom onload last
        'source/scripts/onload.js',
        // Catch for any unaccounted for files
        'source/scripts/**/*.js'
      ], {base: source + 'scripts/'}))
      .pipe(sourceMap ? sourcemaps.init() : gutil.noop())
      .pipe(concat('scripts.js'))
      .pipe(isProduction ? uglify({mangle: true}) : gutil.noop())
      .pipe(sourceMap ? sourcemaps.write('.') : gutil.noop())
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }))
      .on('error', function (error) {
        gutil.log(error);
      });
});

// -- Build Images
gulp.task('images', function() {
  gutil.log("Building " + gutil.colors.yellow("all") + " Images...");

  // TODO: don't rebuild if they exist

  gulp.src(source + 'images/**/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest(dest + 'images/'))
    .pipe(browserSync.reload({ stream: true }))
    .on('error', function (error) {
      gutil.log(error);
    });
});

// -- Build CSS from Sass
gulp.task('sass', function() {
  gutil.log("Building " + gutil.colors.yellow(sassStyle) + " Sass...");

  return gulp.src(source + 'sass/styles.scss')
    .pipe(compass({
      config_file: './config-sass.rb',
      sass: source + 'sass/',
      css: dest,
      style: sassStyle,
      sourcemap: sourceMap,
      comments: isProduction,
      debug: isProduction
    }))
    .on('error', function (error) {
      gutil.log(error);
    });
});

// -- Run processes on CSS
gulp.task('css', ['sass'],  function() {
  gutil.log("Formatting " + gutil.colors.yellow(sassStyle) + " CSS...");

  return gulp.src(dest + 'styles.css')
    .pipe(sourceMap ? sourcemaps.init() : gutil.noop())
    .pipe(autoprefixer({
      browsers: browserlist
    }))
    .pipe(sourceMap ? sourcemaps.write('.') : gutil.noop())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({ stream: true }))
    .on('error', function (error) {
      gutil.log(error);
    });
});

// ------ Utilities ------

gulp.task('lint', function () {
  return gulp.src(source + 'sass/**/*.s+(a|c)ss')
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});


// ------ Watchers ------

// -- Watch, Sync, Build... repeat
gulp.task('watch', ['build'], function() {
  browserSync({
    notify: false,
    port: 5050,
    server: {
      baseDir: [dest]
    }
  })

  // All the watches
  gulp.watch(source + 'index.mustache', ['templates']);
  gulp.watch(source + 'templates/**/*.mustache', ['templates']);
  gulp.watch(source + 'sass/**/*.scss', ['css']);
  gulp.watch(source + 'scripts/**/*.js', ['js']);
  gulp.watch(source + 'images/**/*', ['images']);
  gulp.watch(source + 'model.json', ['templates']);

});


// ------ Builders ------

gulp.task('default', ['watch']);
gulp.task('compile', sequence('clean', ['js', 'images', 'css'], 'templates', 'start'));
gulp.task('build', sequence('images', 'js', 'css', 'templates'));
