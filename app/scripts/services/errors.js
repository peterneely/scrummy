'use strict';

(function () {
  var errorService = function () {

    var errors = {
      'EMAIL_TAKEN': 'That email address is already taken. Please choose another.',
      'INVALID_USER': 'The email address or password is incorrect. Please try again.',
      'INVALID_PASSWORD': 'The email address or password is incorrect. Please try again.'
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