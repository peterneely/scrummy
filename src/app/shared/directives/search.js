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
        clear: '&scClear',
        disabled: '@ngDisabled',
        model: '=ngModel',
        searchId: '@'
      },
      controller: SearchController,
      replace: true
    };
  }

  SearchController.$inject = ['$scope', 'Search'];

  function SearchController($scope, Search) {

    var _searchId = $scope.searchId;

    $scope.clearSearch = clearSearch;
    $scope.saveSearch = saveSearch;
    $scope.searching = searching;

    applySavedSearch();

    function applySavedSearch() {
      if (angular.isDefined(_searchId)) {
        $scope.model = Search.apply(_searchId);
      }
    }

    function clearSearch() {
      $scope.model = {};
      Search.remove(_searchId);
      $scope.clear();
    }

    function saveSearch() {
      Search.save(_searchId, $scope.model.text);
    }

    function searching() {
      return angular.isDefined($scope.model.text);
    }
  }

})();