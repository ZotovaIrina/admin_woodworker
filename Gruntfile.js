module.exports = function (grunt) {

    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),

            jshint: {                   // Проверка ошибок
                files: [
                    'client/js/**/*.js',

                    '!client/js/build.js'
                ],
                options: {
                    globals: {
                        jQuery: true
                    }
                }
            },
            browserify: {
                main: {
                    options: {
                        browserifyOptions: {
                            debug: true
                        }
                    },
                    files: [{
                        src: ['client/js/**/*.js', '!client/js/build.js'],
                        dest: 'client/js/build.js'
                    }]
                }
            },
            sass: {                              // Task
                dist: {                            // Target
                    options: {                       // Target options
                        style: 'expanded'
                    },
                    files: {                         // Dictionary of files
                        'client/css/main.css': 'client/scss/main.scss'
                    }
                }
            },
            watch: {                //Сканирует изменения в файлах, если изменение есть, то автоматически запускает browserify
                scripts: {
                    files: ['client/js/**/*.js', '!client/js/build.js'],
                    tasks: ['jshint', 'browserify'],
                    options: {}
                },
                css: {
                    files: ['client/scss/**/*.scss'],
                    tasks: ['sass'],
                    options: {}
                }
            }
        }
    );


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('dev', [
        'devBuild',
        'watch'
    ]);
    grunt.registerTask('devBuild', [
        'jshint',
        'browserify',
        'sass'
    ]);
};