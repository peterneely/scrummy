'use strict';

(function () {

  var controller = ['$scope', '$filter', function ($scope, $filter) {

    $scope.types = ['clients', 'projects', 'tasks'];

    $scope.options = {};

    angular.forEach($scope.types, function (type) {
      initOptions(type);
    });

    function initOptions(type) {
      $scope.options[type] = {
        data: getData(type),
        placeholder: getPlaceholder(type),
        createSearchChoice: addSelectOption(type)
      };
    }

    function getData(type) {
      var array = [];
      var items = $scope.scData[type];
      angular.forEach(items, function (item) {
        array.push({
          id: item.$id,
          text: item.name
        });
      });
      return $filter('orderBy')(array, 'text', false);
    }

    function getPlaceholder(type) {
      var singularType = $filter('rtrim')(type, 's');
      return $filter('ucfirst')(singularType);
    }

    function addSelectOption(type) {
      return function (term) {
        var newOption = {
          id: '',
          text: term
        };
        $scope.scState[type] = newOption;
        $scope.$apply();
        return newOption;
      };
    }
  }];

  var selectsDirective = function () {
    return {
      templateUrl: '../../views/directives/selects.html',
      scope: {
        scData: '=',
        scState: '=',
        scClass: '@'
      },
      controller: controller,
      replace: true
    };
  };

  angular
    .module('scrummyApp')
    .directive('selects', selectsDirective);
})();