'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('compareTo', CompareToDirective);

  function CompareToDirective() {
    return {
      require: 'ngModel',
      scope: {
        other: '=compareTo'
      },
      link: Link
    };

    function Link(scope, element, attributes, controller) {

      controller.$parsers.unshift(validateThis);
      scope.$watch('other', validateOther);

      function setValidity(viewValue){
        var valid = angular.isUndefined(scope.other) ? true : viewValue === scope.other;
        controller.$setValidity('compareTo', valid);
      }

      function validateOther(){
        setValidity(controller.$viewValue);
      }

      function validateThis(viewValue) {
        setValidity(viewValue);
        return viewValue;
      }
    }
  }
})();
