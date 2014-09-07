'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('time', TimeDirective);

  TimeDirective.$inject = ['$filter'];

  function TimeDirective($filter) {

    return {
      templateUrl: 'views/directives/time.html',
      scope: {
        scModel: '=',
        scClass: '@',
        scPlaceholder: '@'
      },
      link: TimeLink,
      replace: true
    };

    function TimeLink(scope, element) {
      element.on('blur', onBlur);

      function onBlur(){
        var value = element.val();
        element.val(getTime(value));

        function getTime(value) {
          if (noTime(value)) {
            return value;
          } else if (invalidTime(value)) {
            return defaultTime();
          } else {
            return formattedTime(value);
          }

          function noTime(value) {
            return value === '';
          }

          function invalidTime(value) {
            return !$filter('validTime')(value);
          }

          function defaultTime() {
            return $filter('date')(Date.now(), 'HH:mm');
          }

          function formattedTime(value) {
            var formatted = $filter('formatTime')(value);
            scope.scModel = formatted;
            scope.$apply();
            return formatted;
          }
        }
      }
    }
  }

})();