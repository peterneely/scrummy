'use strict';

(function () {
  var errorService = function () {

    var errors = {
      'EMAIL_TAKEN': 'Email already registered',
      'INVALID_USER': 'Invalid email or password',
      'INVALID_PASSWORD': 'Invalid email or password'
    };

    var getMessage = function (error) {
      return errors[error.code.toUpperCase()];
    };

    return {
      getMessage: getMessage
    };
  };

  angular
    .module('scrummyApp')
    .factory('Errors', errorService);
})();