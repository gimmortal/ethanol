'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'source/css/style.css': 'source/less/style.less'
        }
      }
    },

    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "qzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 3 versions'})
        ]
      },
      style: {
        src: 'build/css/*.css'
      }
    },

    csscomb: {
      style: {
        expand: true,
        src: ["source/less/**/*.less"]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expanded: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
        }
      },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
          "build/index.min.html": "build/index.html"
        }
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "css/**",
            "img/**",
            "js/**",
            "font/**",
            "*.html"
          ],
          dest: "build",
        }]
      }
    },

    clean: {
      build: ["build"]
    },

    watch: {
      style: {
        files: ['source/less/**/*.less'],
        tasks: ['csscomb','less'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    browserSync: {
      bsFiles: {
        src : 'less/css/*.css'
      },
      options: {
        server: {
          baseDir: "./"
        }
      }
    }
   };

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "cmq",
    "postcss",
    "cssmin",
    "imagemin",
    "htmlmin"
  ]);

  grunt.initConfig(config);
};
