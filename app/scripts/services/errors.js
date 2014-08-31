'use strict';

(function () {
  var errorService = function () {

    var getMessage = function (error) {
      switch (error.code.toUpperCase()) {

        case 'EMAIL_TAKEN':
          return 'Email already registered';

        case 'INVALID_USER':
        case 'INVALID_PASSWORD':
          return 'Invalid email or password';

        default:
          return 'Server error';
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