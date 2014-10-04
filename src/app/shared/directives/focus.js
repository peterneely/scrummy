'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('focus', FocusDirective);

  FocusDirective.$inject = ['$timeout'];

  function FocusDirective($timeout) {
    return {
      link: Link
    };

    function Link(scope, element) {
      var firstElem = $(element[0]);
      var found = firstElem.is('input') ? firstElem : element.find('input');
      $timeout(function () {
        found.focus();
      }, 50);
    }
  }

})();