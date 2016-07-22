module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',
    cssmin: {
      options: {
        banner: '/* Minified CSS File - <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */'
      },
      minify: {
        src: 'css/stylesheet.css',
        dest: '<%= dist %>/css/stylesheet.min.css'
      }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'images/src/',
          src: '**/*.*',
          dest: '<%= dist %>/images/'
        }]
      }
    },
    copy: {
      js: {
        expand: true,
        cwd: 'js/',
        src: '**/*.js',
        dest: '<%= dist %>/js/'
      },
      css: {
        expand: true,
        cwd: 'css/vendor',
        src: '*.css',
        dest: '<%= dist %>/css/vendor/' 
      },
      fonts: {
        expand: true,
        cwd: 'css/fonts',
        src: '*.*',
        dest: '<%= dist %>/css/fonts/' 
      },
      index: {
        src: 'index.html',
        dest: 'dist/'
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.rangeandroam.com',
          port: 21,
          authKey: 'key'
        },
        src: '/Users/richardlucas/Projects/richardalucas.com/dist',
        dest: '/public_html/richardalucas.com',
        exclusions: [],
        forceVerbose: true
      }
    },
    gitadd: {
      task: {
        options: {
          cwd: '/Users/richardlucas/Projects/richardalucas.com',
          verbose: true
        },
        files: {
          cwd: '/Users/richardlucas/Projects/richardalucas.com',
          src: ['.']
        }
      }
    },
    gitcommit: {
      task: {
        options: {
          message: 'Updated website',
          verbose: true
        }
      }
    },
    gitpush: {
      task: {
        options: {
          remote: 'origin',
          verbose: true
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'css',
          src: 'stylesheet.css',
          dest: 'css'
        }]
      }
    },
    clean: ['dist/']
  });

  grunt.registerTask('build', ['clean', 'autoprefixer','cssmin', 'imagemin', 'copy']);

  grunt.registerTask('git', ['gitadd', 'gitcommit', 'gitpush']);

  grunt.registerTask('deploy', ['ftp-deploy']);

  grunt.registerTask('default', ['build', 'git', 'deploy']);
};
