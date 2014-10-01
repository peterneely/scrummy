'use strict';

(function () {
  angular
    .module('scrummyApp')
    .directive('datetime', DateTimeDirective);

  function DateTimeDirective() {
    return {
      templateUrl: '/app/time/directives/form.datetime.html',
      scope: {
        model: '=ngModel'
      },
      controller: DateTimeController,
      replace: true
    };
  }

  DateTimeController.$inject = ['$scope'];

  function DateTimeController($scope) {
    $scope.dateOptions = options();
    $scope.open = onOpen;
    $scope.opened = false;

    function onOpen($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    }

    function options() {
      return {
        startingDay: 1,
        showWeeks: false
      };
    }
  }

})();