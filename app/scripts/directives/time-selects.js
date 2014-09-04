'use strict';

(function () {

  var controller = ['$scope', 'TYPES', 'String',
    function ($scope, TYPES, String) {

      $scope.options = {};

      angular.forEach(TYPES, function (type) {
        initOptions(type);
      });

      function initOptions(type) {
        $scope.options[type] = {
          data: getData(type),
          placeholder: getPlaceholder(type),
          allowClear: true,
          createSearchChoice: addSelectOption(type)
        };
      }

      function getData(type) {
        var array = [];
        var items = $scope.timeData[type];
        angular.forEach(items, function (item) {
          array.push({
            id: item.$id,
            text: item.name
          });
        });
        return _.sortBy(array, 'text');
      }

      function getPlaceholder(type) {
        return String.initialCaps(String.singular(type));
      }

      function addSelectOption(type) {
        return function (term) {
          var newOption = {
            id: '',
            text: term
          };
          $scope.timeSelected[type] = newOption;
          $scope.$apply();
          return newOption;
        };
      }
    }];

  var timeSelectsDirective = function () {
    return {
      templateUrl: '../../views/directives/time-selects.html',
      scope: {
        timeData: '=',
        timeSelected: '='
      },
      controller: controller
    };
  };

  angular
    .module('scrummyApp')
    .directive('timeSelects', timeSelectsDirective);
})();