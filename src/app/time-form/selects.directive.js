'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('selects', SelectsDirective);

  function SelectsDirective() {
    return {
      templateUrl: '/app/time-form/selects.directive.html',
      scope: {
        data: '=scData',
        model: '=ngModel',
        class: '@scClass'
      },
      controller: SelectsController
    };
  }

  SelectsController.$inject = ['$scope', 'Obj', 'String'];

  function SelectsController($scope, Obj, String) {

    $scope.isBold = isBold;
    $scope.types = ['client', 'project', 'task'];
    $scope.options = selectsOptions();

    function isBold(type){
      return !Obj.isEmpty($scope.model[type]);
    }

    function selectsOptions() {
      var options = {};
      angular.forEach($scope.types, function (type) {
        options[type] = optionsFor(type);
      });
      return options;

      function optionsFor(type) {
        return {
          data: getData(type),
          placeholder: String.ucFirst(type),
          createSearchChoice: addSelectOption(type)
        };

        function getData(type) {
          return $scope.data[String.plural(type)];
        }

        function addSelectOption(type) {
          return function (term) {
            var newOption = {
              id: '',
              text: term
            };
            $scope.model[type] = newOption;
            $scope.$apply();
            return newOption;
          };
        }
      }
    }
  }

})();