'use strict';

(function () {

  var timeDirective = ['$filter', function ($filter) {

    var link = function (scope, element) {

      element.on('blur', function () {
        var value = element.val();
        element.val(getTime(value));
      });

      function getTime(value) {
        if (noTime(value)) {
          return value;
        } else if (invalidTime(value)) {
          return defaultTime();
        } else {
          return formattedTime(value);
        }
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
    };

    return {
      templateUrl: 'views/directives/time.html',
      scope: {
        scModel: '=',
        scClass: '@',
        scPlaceholder: '@'
      },
      link: link,
      replace: true
    };
  }];

  angular
    .module('scrummyApp')
    .directive('time', timeDirective);
})();