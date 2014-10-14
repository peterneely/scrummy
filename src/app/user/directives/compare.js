'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('compareTo', CompareToDirective);

  function CompareToDirective() {
    return {
      require: 'ngModel',
      scope: {
        compareTo: '='
      },
      link: Link
    };

    function Link(scope, element, attributes, controller) {
      registerValidator();
      watchForChanges();

      function registerValidator() {
        controller.$validators.compareTo = function (modelValue) {
          return modelValue === scope.compareTo;
        };
      }

      function watchForChanges() {
        scope.$watch('compareTo', function(){
          controller.$validate();
        });
      }
    }
  }
})();
