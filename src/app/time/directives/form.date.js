'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('date', DateDirective);

  function DateDirective() {
    return {
      templateUrl: '/app/time/directives/form.date.html',
      scope: {
        model: '=ngModel'
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