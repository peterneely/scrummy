'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Error', ErrorService);

  ErrorService.$inject = ['Config', 'Fn'];

  function ErrorService(Config, Fn) {

    return {
      getMessage: getMessage,
      getMessages: getMessages
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
        case 'invalid_email':
        case 'invalid_password':
          return 'Invalid email or password';

        case 'minlength':
          return 'Password must be ' + Config.minPasswordLength + ' characters';

        case 'required':
          return 'All fields are required';

        default:
          return 'Server error';
      }
    }

    function getMessages(form) {
      var messages = [];
      try {
        var formErrors = form.$error;
        var errorCount = Object.keys(formErrors).length;
        if (errorCount) {
          var errorTypes = ['required', 'email', 'minlength', 'compareTo'];
          errorTypes.forEach(function (errorType) {
            var showError = Fn.has(formErrors, errorType);
            var errorExists = formErrors[errorType] !== false;
            if (showError && errorExists) {
              messages.push(getMessage({code: errorType}));
            }
          });
        }
      } catch (error) {
      }
      return messages;
    }
  }

})();
