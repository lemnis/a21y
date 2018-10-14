// Karma configuration
// Generated on Tue Aug 21 2018 19:49:33 GMT+0200 (W. Europe Daylight Time)

var webpackConfig = require('./webpack.tests');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'dist/tests.js',
      'node_modules/chai/chai.js',
      { pattern: 'tests/**/*.ts', watched: false },
      { pattern: 'dist/**/*.ts', watched: false }
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: {
    //   "tests/index.ts": ["webpack"]
    // },

    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadlessWithAom'],

    // you can define custom flags
    customLaunchers: {
      ChromeWithAom: {
        base: 'Chrome',
        flags: [
          '--enable-blink-features=AccessibilityObjectModel',
          '--enable-experimental-web-platform-features',
          '--remote-debugging-port=9333'
        ]
      },
      ChromeHeadlessWithAom: {
        base: 'ChromeHeadless',
        flags: [
          '--enable-blink-features=AccessibilityObjectModel',
          '--enable-experimental-web-platform-features',
          '--remote-debugging-port=9333'
        ]
      },
      FirefoxWithAom: {
        base: 'Firefox',
        prefs: {
          'accessibility.AOM.enabled': true
        }
      },
      FirefoxHeadlessWithAom: {
        base: 'Firefox',
        flags: ['--headless'],
        prefs: {
          'accessibility.AOM.enabled': true
        }
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
