'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('date', DateDirective);

  function DateDirective() {
    return {
      templateUrl: 'views/directives/date.html',
      scope: {
        scModel: '='
      },
      controller: DateController,
      replace: true
    };
  }

  function DateController($scope) {

    $scope.dateOptions = options();
    $scope.scModel = Date.now();
    $scope.open = onOpen;
    $scope.opened = false;

    function onOpen($event){
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
      console.log($scope.opened);
    }

    function options(){
      return {
        startingDay: 1,
        showWeeks: false
      };
    }
  }

})();