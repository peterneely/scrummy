'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('time', TimeDirective);

  TimeDirective.$inject = ['Time'];

  function TimeDirective(Time) {

    return {
      templateUrl: '../../../views/directives/time.html',
      scope: {
        scModel: '=',
        scClass: '@',
        scPlaceholder: '@'
      },
      link: TimeLink,
      replace: true
    };

    function TimeLink(scope, element) {
      element.on('blur', function () {
        scope.scModel = Time.fromInput(element.val());
        scope.$digest();
      });
    }
  }

})();