'use strict';

(function () {

  var timeDirective = ['$filter', function ($filter) {

    var link = function (scope, element) {

      element.on('blur', function () {
        var value = element.val();
        element.val(getTime(value));
      });

      var timeFormat = 'HH:mm';

      function getTime(value) {
        if (isEmpty(value)) {
          return value;
        } else if (invalidTime(value)) {
          return defaultTime();
        } else {
          return formatTime(value);
        }
      }

      function isEmpty(value) {
        return value === '';
      }

      function invalidTime(value) {
        console.log(isNumber(value));
        return !isNumber(value) || !validTimeDelimeter(value);
      }

      function isNumber(value) {
        return $filter('isNumber')(value);
      }

      function validTimeDelimeter(value) {
        return $filter('contains')(['.', ',', ':'], value) || isNumber(value);
      }

      function defaultTime() {
        return $filter('date')(Date.now(), timeFormat);
      }

      function formatTime(value) {
        return 'hazzah';
      }
    };

    return {
      templateUrl: '../../views/directives/time.html',
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