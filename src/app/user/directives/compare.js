'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('compareTo', CompareToDirective);

  function CompareToDirective() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: Link
    };

    function Link(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue){
        return modelValue === scope.otherModelValue;
      };

      scope.$watch('otherModelValue', function(){
        ngModel.$validate();
      });
    }
  }
})();