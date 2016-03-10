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
            },
            uglify: {
                js: {
                    src: ['client/js/build.js'],
                    dest: 'dist/js/build.min.js'
                }
            },
            cssmin: {
                minify: {
                    src: 'client/css/main.css',
                    dest: 'dist/css/main.min.css'
                }
            },
            clean: {
                build: {
                    src: ['dist/']
                }
            },
            copy: {
                dist: {
                    cwd: 'client',
                    src: ['lib/**/*.*', 'template/**/*.*', 'index.html'],
                    dest: 'dist',
                    expand: true
                }
            },
            filerev: {
                options: {
                    encoding: 'utf8',
                    algorithm: 'md5',
                    length: 5
                },
                release: {
                    // filerev:release hashes(md5) all assets (images, js and css )
                    // in dist directory
                    files: [{
                        src: [
                            'dist/js/*.js',
                            'dist/css/*.css'
                        ]
                    }]
                }
            },
            usemin: {
                html: 'dist/index.html',
                options: {
                    assetsDirs: ['dist', 'dist/css', 'dist/js']
                }
            }
        }
    );


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

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
    grunt.registerTask('dist', [
        'devBuild',
        'clean',
        'copy',
        'uglify',
        'cssmin',
        'filerev',
        'usemin'
    ]);

};