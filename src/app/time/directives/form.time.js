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
        model: '=scModel',
        class: '@scClass',
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
      }

      function formattedTime(){
        return Time.parseInput(element.val());
      }
    }
  }

})();