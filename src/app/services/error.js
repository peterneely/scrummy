'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Error', ErrorService);

  function ErrorService() {

    return {
      getMessage: getMessage
    };

    function getMessage(error) {
      switch (error.code.toUpperCase()) {

        case 'EMAIL_TAKEN':
          return 'Email already registered';

        case 'INVALID_USER':
        case 'INVALID_PASSWORD':
          return 'Invalid email or password';

        default:
          return 'Server error';
      }
    }
  }

})();