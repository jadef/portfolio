module.exports = function(grunt) {

  // Specify where all the js files to be minified are here
  var jslibfiles = [
    'node_modules/jquery/dist/jquery.js',
    'source/scripts/jquery.simplemodal.js',
    'source/scripts/modernizr.js',
    'source/scripts/retina.js'
  ];

  var jsfiles = [
    'source/scripts/onload.js'
  ];

  // And specify the css files here
  var cssfiles = [
    'source/css/normalize.css',
    'source/css/main.css'
  ];

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      all: {
        files: {
          'public/scripts/scripts.min.js': jsfiles
        },
      },
    },
    cssmin: {
      minify: {
        src: cssfiles,
        dest: 'public/styles/main.min.css',
      },
    },
    watch: {
      js: {
        files: jslibfiles.concat(jsfiles),
        tasks: 'uglify',
        options: {
          spawn: false,
          interrupt: true,
        },
      },
      sass: {
        files: lw + 'sass/**/*.scss',
        tasks: ['buildcss'],
        options: {
          spawn: false,
          interrupt: false,
        },
      },
      css: {
        files: cssfiles,
        tasks: 'cssmin',
        options: {
          spawn: false,
          interrupt: true,
        },
      }
    },
    csswatch: {
      watch: {
        files: cssfiles,
        tasks: 'cssmin'
      }
    },
    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'expanded'
        },
        files: {
          'source/css/main.css': 'source/sass/main.scss',
        }
      }
    }
  });

  // load plugins
  [
    'grunt-contrib-uglify',
    'grunt-contrib-cssmin',
    'grunt-contrib-watch',
    'grunt-contrib-sass'
  ].forEach(function(plugin) {
    grunt.loadNpmTasks(plugin);

  });

  // register tasks
  grunt.registerTask('build', ['sass', 'cssmin', 'uglify']);
  grunt.registerTask('buildcss', ['sass', 'cssmin']);
  grunt.registerTask('run', ['cssmin', 'watch']);
  grunt.registerTask('default', ['build']);
};
