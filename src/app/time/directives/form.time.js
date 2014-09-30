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
        model: '=scModel',
        class: '@scClass',
        placeholder: '@scPlaceholder',
        update: '=scUpdate'
      },
      link: timeLink,
      replace: true
    };

    function timeLink(scope, element) {
      element.on('blur', blur);

      function blur() {
        scope.model = formattedTime();
        scope.$digest();
        scope.change();
      }

      function formattedTime(){
        return Time.parseInput(element.val());
      }
    }
  }

})();