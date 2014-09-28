'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('selects', SelectsDirective);

  function SelectsDirective() {
    return {
      templateUrl: '/app/time/directives/form.selects.html',
      scope: {
        data: '=scData',
        model: '=ngModel',
        class: '@scClass'
      },
      controller: SelectsController
    };
  }

  SelectsController.$inject = ['$scope', 'Fn'];

  function SelectsController($scope, Fn) {

    $scope.isBold = isBold;
    $scope.types = ['client', 'project', 'task'];
    $scope.options = selectsOptions();
    $scope.updated = updated;

    function updated(type) {
      $scope.data.updated[type] = $scope.model[type];
    }

    function isBold(type) {
      return !Fn.isEmpty($scope.model[type]);
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
          placeholder: Fn.ucFirst(type),
          createSearchChoice: addSelectOption(type)
        };

        function getData(type) {
          return $scope.data[Fn.plural(type)];
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