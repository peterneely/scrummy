'use strict';

(function () {
  var errorService = function () {

    var getMessage = function (error) {
      switch (error.code.toUpperCase()) {

        case 'EMAIL_TAKEN':
          return 'That email address is already taken. Please choose another.';

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