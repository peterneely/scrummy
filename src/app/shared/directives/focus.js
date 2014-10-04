'use strict';

(function () {

  angular
    .module('scrummyApp')
    .directive('focus', FocusDirective);

  FocusDirective.$inject = ['$', '$parse', '$timeout'];

  function FocusDirective($, $parse, $timeout) {
    return {
      link: Link
    };

    function Link(scope, element, attributes) {
      if (enabled()) {
        setFocus();
      }

      function enabled() {
        var setting = attributes.focusIf || 'true';
        return $parse(setting)() === true;
      }

      function setFocus() {
        var firstElem = $(element[0]);
        var found = firstElem.is('input') ? firstElem : element.find('input');
        $timeout(function () {
          found.focus();
        }, 50);
      }
    }
  }

})();