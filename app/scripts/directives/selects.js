'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('selects', SelectsDirective);

  function SelectsDirective() {
    return {
      templateUrl: 'views/directives/selects.html',
      scope: {
        scData: '=',
        scState: '=',
        scModel: '=',
        scClass: '@'
      },
      controller: SelectsController
    };
  }

  SelectsController.$inject = ['$scope', '$filter'];

  function SelectsController($scope, $filter) {

    $scope.types = ['client', 'project', 'task'];
    $scope.options = selectsOptions();

    loadDefaults();

    function loadDefaults() {
      angular.forEach($scope.types, function (type) {
        var hasPref = _.has($scope.scState, type);
        var first = $scope.options[type].data[0];
        $scope.scModel[type] = hasPref ? $scope.scState[type] : first;
      });
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
          placeholder: $filter('ucFirst')(type),
          createSearchChoice: addSelectOption(type)
        };

        function getData(type) {
          var array = [];
          type = $filter('plural')(type);
          var items = $scope.scData[type];
          angular.forEach(items, function (item) {
            array.push({
              id: item.$id,
              text: item.name
            });
          });
          return $filter('orderBy')(array, 'text');
        }

        function addSelectOption(type) {
          return function (term) {
            var newOption = {
              id: '',
              text: term
            };
            $scope.scModel[type] = newOption;
            $scope.$apply();
            return newOption;
          };
        }
      }
    }
  }

})();