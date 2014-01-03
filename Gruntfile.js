module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			options: {
				banner: '/* Minified CSS File - <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			minify: {
				expand: true,
				cwd: '',
				src: '*.css',
				dest: '',
				ext: '.min.css'
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
					host: 'rangeandroam.com',
					port: 21,
					authKey: 'key'
				},
				src: '/Users/richardlucas/Projects/richardalucas.com',
				dest: '/richardalucas.com',
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
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-ftp-deploy');

	grunt.registerTask('build', ['cssmin', 'imagemin']);

	grunt.registerTask('deploy', ['ftp-deploy']);

	grunt.registerTask('default', ['build', 'deploy']);
};