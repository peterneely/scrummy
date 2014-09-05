'use strict';

(function () {

  var controller = ['$scope', 'String', function ($scope, String) {

    $scope.options = {};

    angular.forEach(['clients', 'projects', 'tasks'], function (type) {
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
      var items = $scope.data[type];
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
        $scope.selected[type] = newOption;
        $scope.$apply();
        return newOption;
      };
    }
  }];

  var selectsDirective = function () {
    return {
      templateUrl: '../../views/directives/selects.html',
      scope: {
        data: '=',
        selected: '='
      },
      controller: controller,
      link: function (scope, element) {
        $(function () {
          element.on('change', function (e) {
            console.log('change');

          });
        });
      }
    };
  };

  angular
    .module('scrummyApp')
    .directive('selects', selectsDirective);
})();