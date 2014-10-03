'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('time', TimeDirective);

  TimeDirective.$inject = ['Time'];

  function TimeDirective(Time) {

    return {
      templateUrl: '/app/time/directives/form.time.html',
      require: 'ngModel',
      scope: {
        change: '&scChange',
        class: '@scClass',
        model: '=ngModel',
        placeholder: '@scPlaceholder',
        validate: '&scValidate'
      },
      link: Link,
      replace: true
    };

    function Link(scope, element) {
      element.children().on('blur', blurEvent);

      function blurEvent() {
        scope.model = _formattedTime();
        scope.$digest();
        scope.validate();
        scope.change();
      }

      function _formattedTime() {
        return Time.parseInput(element.children().val());
      }
    }
  }

})();