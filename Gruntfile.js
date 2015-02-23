// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js', '!src/bower_components/**/*.js', '!src/scripts/jquery-*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: [{
            expand: true,
            src: '**/*.js',
            dest: 'dist/scripts',
            cwd: 'src/scripts'
        }]
      }
    },

    // compile less stylesheets to css -----------------------------------------
    less: {
      build: {
        files: {
          'src/styles/style.css': 'src/styles/style.less'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/styles/style.css': 'src/styles/style.css'
        }
      }
    },

    copy: {
      files: {
        cwd: 'src/',      // set working folder / root to copy
        src: ['popup.html', 'manifest.json', 'images/**', 'bower_components/**'],        // copy all files and subfolders
        dest: 'dist/',    // destination folder
        expand: true      // required when using cwd
      }
    },

    vulcanize: {
      options: {
        csp: true,
        strip: true,
        excludes: {
          imports: [
            "dist/bower_components/polymer/polymer.html"
          ]
        }
      },
      build: {
        files: {
          'dist/popup.html': 'dist/popup.html'
        }
      }
    },

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // ===========================================================================
  // CREATE TASKS ==============================================================
  // ===========================================================================
  // this default task will go through all configuration (dev and production) in each task 
  grunt.registerTask('default', ['jshint', 'copy', 'uglify', 'cssmin', 'vulcanize']);

};