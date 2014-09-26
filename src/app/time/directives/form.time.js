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
        placeholder: '@scPlaceholder'
      },
      link: timeLink,
      replace: true
    };

    function timeLink(scope, element) {
      element.on('blur', function () {
        scope.model = Time.parseInput(element.val());
        scope.$digest();
      });
    }
  }

})();