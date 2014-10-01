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
      require: 'ngModel',
      link: Link,
      replace: true
    };
  }

  function Link(scope, elem, attrs, ctrl) {
    scope.dateOptions = options();
    scope.open = onOpen;
    scope.opened = false;
    scope.valid = {
      start: true,
      end: true
    };
    scope.validate = validate;

    function validate(){
      ctrl.$setValidity('valid', false);
      scope.valid.start = true;
      scope.valid.end = false;
    }

    function onOpen($event) {
      $event.preventDefault();
      $event.stopPropagation();
      scope.opened = true;
    }

    function options() {
      return {
        startingDay: 1,
        showWeeks: false
      };
    }
  }

})();