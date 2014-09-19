'use strict';

(function () {

  var logService = ['$log', 'Config', function ($log, Config) {

    return {
      debug: debug,
      error: error,
      info: info,
      log: log,
      warn: warn
    };

    function debug (message) {
      output('debug', message);
    }

    function error(message) {
      output('error', message);
    }

    function info (message) {
      output('info', message);
    }

    function log (message) {
      output('log', message);
    }

    function warn (message) {
      output('warn', message);
    }

    function output(type, message){
      if(Config.loggingEnabled){
        $log[type](':' + message);
      }
    }
  }];

  angular
    .module('scrummyApp')
    .factory('Log', logService);
})();