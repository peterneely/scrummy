'use strict';

(function () {

  angular
    .module('TestApp', ['ui.bootstrap']) //'ui.bootstrap'
    .controller('Test', TestController);

  TestController.$inject = ['$scope'];

  function TestController($scope) {

    $scope.name = 'Peter';    
  }

})();