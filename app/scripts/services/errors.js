'use strict';

(function () {
  var errorService = function () {

    var getMessage = function (error) {
      switch (error.code.toUpperCase()) {

        case 'EMAIL_TAKEN':
          return 'That email address is already taken. Please choose another.';

        case 'INVALID_USER':
        case 'INVALID_PASSWORD':
          return 'The email address or password is incorrect. Please try again.';

        default:
          return '';
      }
    };

    return {
      getMessage: getMessage
    };
  };

  angular
    .module('scrummyApp')
    .factory('Errors', errorService);
})();