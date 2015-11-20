module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'vendor/jquery.min.js',
                    'vendor/underscore-min.js',
                    'vendor/backbone-min.js',
                    'app/app.js',
                    'app/collections/*.js',
                    'app/models/*.js',
                    'app/views/*.js'
                ],
                dest: 'dist/app.js',
            }
        },

        less: {
          development: {
            options: {
              paths: [
                "assets/styles",
                "node_modules/bootstrap/less",
                "node_modules/font-awesome/less"
              ],
              ieCompat: false
            },
            files: {
              "dist/styles/app.css": "assets/styles/app.less"
            }
          }
        },

        copy: {
          main: {
            files: [
              {
                expand: true,
                src: ['node_modules/font-awesome/fonts/*'],
                dest: 'dist/fonts',
                flatten: true,
                filter: 'isFile'
              }
            ]
          }
        },

        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: ['assets/styles/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', 'watch');

};
