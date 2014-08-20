'use strict';

(function () {
  var errorService = function () {

    var errors = {
      'EMAIL_TAKEN': 'Email address already taken.',
      'INVALID_USER': 'Invalid email address or password.',
      'INVALID_PASSWORD': 'Invalid email address or password.'
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