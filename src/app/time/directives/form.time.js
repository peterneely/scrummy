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
      element.on('blur', parseTime);
      element.on('change', update);

      function formattedTime(){
        return Time.parseInput(element.val());
      }

      function parseTime() {
        scope.model = formattedTime();
        scope.$digest();
      }

      function update() {
        scope.update = formattedTime();
        scope.change({error: 'nope', valid: false});
      }
    }
  }

})();