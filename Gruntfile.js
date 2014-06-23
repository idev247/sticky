'use strict';
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      options: {
        port: 9001,
        hostname: 'localhost'
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
            mountFolder(connect, '.tmp'),
            mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    mocha: {
      test: {
        src: ['test/tests.html'],
        options: {
          mocha: {
            ignoreLeaks: false
          },
          reporter: 'Spec',
          run: true,
          timeout: 10000
        }
      }
    },
    clean: {
      server: '.tmp'
    }
  });

  grunt.registerTask('test', [
    'clean:server',
    'connect:test',
    'mocha'
    ]);
};
