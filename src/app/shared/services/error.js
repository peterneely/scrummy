'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Error', ErrorService);

  ErrorService.$inject = ['Config'];

  function ErrorService(Config) {

    return {
      getMessage: getMessage
    };

    function getMessage(error) {
      switch (error.code.toLowerCase()) {

        case 'compareto':
          return 'Passwords do not match';

        case 'email':
          return 'Email is not valid';

        case 'email_taken':
          return 'Email already registered';

        case 'invalid_user':
        case 'invalid_password':
          return 'Invalid email or password';

        case 'minlength':
          return 'Password must be 6 characters';

        case 'required':
          return 'All fields are required';

        default:
          return 'Server error';
      }
    }
  }

})();
