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

    function applySavedSearch(){
      $scope.model = Search.apply(_searchId);
    }

    function clearSearch() {
      $scope.model = '';
      Search.remove(_searchId);
    }

    function saveSearch(){
      Search.save(_searchId, $scope.model);
    }

    function searching() {
      return $scope.model.length > 0;
    }
  }

})();