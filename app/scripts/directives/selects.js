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
      return $filter('orderBy')(array, 'text');
    }

    function getPlaceholder(type) {
      var singularType = $filter('singular')(type);
      return $filter('ucFirst')(singularType);
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
  }];

  var selectsDirective = function () {
    return {
      templateUrl: 'views/directives/selects.html',
      scope: {
        scData: '=',
        scModel: '=',
        scClass: '@'
      },
      controller: controller
    };
  };

  angular
    .module('scrummyApp')
    .directive('selects', selectsDirective);
})();