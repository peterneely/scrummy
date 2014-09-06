'use strict';

(function () {

  var timeDirective = ['Filter', function (Filter) {

    var link = function (scope, element) {

      element.on('blur', function () {
        var value = element.val();
        element.val(getTime(value));
      });

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
        console.log(isNumeric(value));
        return !isNumeric(value) || !validTimeDelimeter(value);
      }

      function isNumeric(value) {
        return Filter.isNumeric(value);
      }

      function validTimeDelimeter(value) {
        return Filter.contains(['.', ',', ':'], value);
      }

      function defaultTime() {
        return Filter.dateFormat(Date.now(), 'HH:mm');
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