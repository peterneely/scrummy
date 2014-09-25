'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('String', StringService);

  function StringService() {

    return {
      doubleDigits: doubleDigits,
      plural: plural,
      singular: singular,
      ucFirst: ucFirst
    };

    function doubleDigits(value) {
      return ('0' + value).substr(-2);
    }

    function plural(value) {
      return value + 's';
    }

    function singular(value) {
      return value.replace(/[sS]+$/, '');
    }

    function ucFirst(value) {
      return value.replace(/(^|[\. ])\s*./g, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1);
      });
    }
  }

})();