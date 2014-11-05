// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'src/bower_components/angular/angular.js',
      'src/bower_components/angular-mocks/angular-mocks.js',
      'src/bower_components/angular-animate/angular-animate.js',
      'src/bower_components/angular-cookies/angular-cookies.js',
      'src/bower_components/angular-resource/angular-resource.js',
      'src/bower_components/angular-route/angular-route.js',
      'src/bower_components/angular-sanitize/angular-sanitize.js',
      'src/bower_components/angular-touch/angular-touch.js',

      'src/bower_components/jquery/dist/jquery.js',
      'src/bower_components/json3/lib/json3.js',
      'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'src/bower_components/angular-ui-router/release/angular-ui-router.js',
      'src/bower_components/firebase/firebase.js',
      'src/bower_components/firebase-simple-login/firebase-simple-login.js',
      'src/bower_components/mockfirebase/dist/mockfirebase.js',
      'src/bower_components/angularfire/dist/angularfire.min.js',
      'src/bower_components/select2/select2.js',
      'src/bower_components/angular-ui-select2/src/select2.js',
      'src/bower_components/moment/moment.js',
      'src/bower_components/angular-momentjs/angular-momentjs.js',
      'src/bower_components/lodash/dist/lodash.compat.js',
      'src/bower_components/angular-media-queries/match-media.js',

      'src/app/*.js',
      'src/app/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    // exclude: ['test/mock/controllers/user.js'],
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};