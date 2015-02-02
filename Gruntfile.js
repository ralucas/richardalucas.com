module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			options: {
				banner: '/* Minified CSS File - <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			minify: {
				src: 'css/stylesheet.css',
				dest: 'css/stylesheet.min.css'
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
					src: '**/*.png',
					dest: 'images/dist/'
				}]
			}
		},
		'ftp-deploy': {
			build: {
				auth: {
					host: 'ftp.rangeandroam.com',
					port: 21,
					authKey: 'key'
				},
				src: '/Users/richardlucas/Projects/richardalucas.com',
				dest: '/public_html/richardalucas.com',
				exclusions: ['/Users/richardlucas/Projects/richardalucas.com/**/.DS_Store',
					'/Users/richardlucas/Projects/richardalucas.com/images/src',
					'/Users/richardlucas/Projects/richardalucas.com/stylesheet.css',
					'/Users/richardlucas/Projects/richardalucas.com/Gruntfile.js',
					'/Users/richardlucas/Projects/richardalucas.com/node_modules',
					'/Users/richardlucas/Projects/richardalucas.com/.ftppass',
					'/Users/richardlucas/Projects/richardalucas.com/package.json',
					'/Users/richardlucas/Projects/richardalucas.com/README.md',
					'/Users/richardlucas/Projects/richardalucas.com/.git']
			}
		},
		gitcommit: {
			task: {
				options: {
					message: grunt.option('m')
				}
			},
			files: {
				src: ''
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
    }
	});
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-autoprefixer')

	grunt.registerTask('build', ['autoprefixer','cssmin', 'imagemin']);

	grunt.registerTask('deploy', ['ftp-deploy']);

	grunt.registerTask('default', ['build', 'deploy']);
};