'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('date', DateDirective);

  function DateDirective() {
    return {
      templateUrl: '/app/times/date.directive.html',
      scope: {
        scModel: '='
      },
      controller: DateController,
      replace: true
    };
  }

  DateController.$inject = ['$scope'];

  function DateController($scope) {

    $scope.dateOptions = options();
    $scope.open = onOpen;
    $scope.opened = false;
    $scope.scModel = Date.now();

    function onOpen($event){
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    }

    function options(){
      return {
        startingDay: 1,
        showWeeks: false
      };
    }
  }

})();