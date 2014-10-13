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
      //registerValidator();
      watchForChanges();

      function registerValidator() {
        controller.$validators.compareTo = function (modelValue) {
          console.log(modelValue, scope.compareTo);
          return modelValue === scope.compareTo;
        };
      }

      function watchForChanges() {
        //element.on('change', validate);
        scope.$watch('otherModelValue', validate);

        function validate() {
          controller.$validate();
        }
      }
    }
  }
})();
