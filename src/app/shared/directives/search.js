'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('search', SearchDirective);

  function SearchDirective() {
    return {
      templateUrl: '/app/shared/directives/search.html',
      scope: {
        class: '@ngClass',
        model: '=ngModel'
      },
      controller: SearchController,
      replace: true
    };
  }

  SearchController.$inject = ['$scope'];

  function SearchController($scope) {
    $scope.clearSearch = clearSearch;
    $scope.searching = searching;

    function clearSearch() {
      $scope.model = '';
    }

    function searching() {
      return $scope.model.length > 0;
    }
  }

})();