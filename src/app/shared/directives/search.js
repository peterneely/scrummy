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
    $scope.clearSearch = clearSearch;
    $scope.saveSearch = saveSearch;
    $scope.searching = searching;

    applySavedSearch();

    function applySavedSearch(){
      $scope.model = Search.apply($scope.searchId);
    }

    function clearSearch() {
      $scope.model = '';
      saveSearch();
    }

    function saveSearch(){
      console.log($scope.searchId, $scope.model);
      Search.save($scope.searchId, $scope.model);
    }

    function searching() {
      return $scope.model.length > 0;
    }
  }

})();