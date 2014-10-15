'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('errors', ErrorsDirective);

  function ErrorsDirective() {
    return {
      templateUrl: '/app/user/directives/errors.html',
      scope: {
        errors: '=ngModel'
      }
    };
  }

})();