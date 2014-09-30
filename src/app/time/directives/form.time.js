'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('time', TimeDirective);

  TimeDirective.$inject = ['Time'];

  function TimeDirective(Time) {

    return {
      templateUrl: '/app/time/directives/form.time.html',
      scope: {
        change: '&scChange',
        class: '@scClass',
        model: '=scModel',
        placeholder: '@scPlaceholder',
        validate: '&scValidate'
      },
      link: timeLink,
      replace: true
    };

    function timeLink(scope, element) {
      element.on('blur', blurEvent);

      function blurEvent() {
        scope.model = formattedTime();
        scope.$digest();
        scope.validate();
        scope.change();
      }

      function formattedTime() {
        return Time.parseInput(element.val());
      }
    }
  }

})();