module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
	            dist: {
		        src: [
		            'js/jquery-ui.min.js',
		            'js/jquery.sticky.js',
		            'js/jquery.validate.js',
                'js/scripts.js'
		        ],
		        dest: 'js/build/production.js', // build a file with all js in a folder named build
		    }
        },

        uglify: {
		    build: {
		        src: 'js/build/production.js',
		        dest: 'js/build/production.min.js'
		    }
		},

		compass: {
		    dist: {
		        options: {
		            outputStyle: 'compressed',
		            sassDir: 'scss',
		            cssDir: 'css',
		        }
		    }
		},

		watch: {
		    options: {
		        livereload: true,
		    },
		  scripts: {
		       files: ['js/*.js'],
		       tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		       },
		    },
		    css: {
			    files: ['scss/*.scss', 'scss/base/*.scss'],
			    tasks: ['compass'],
			    options: {
			        spawn: false,
			    }
			}
		}

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['compass', 'watch', 'concat', 'uglify']);

};
