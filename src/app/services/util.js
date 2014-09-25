'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Util', UtilService);

  UtilService.$inject = ['$moment'];

  function UtilService($moment) {

    return {
      contains: contains,
      doubleDigits: doubleDigits,
      plural: plural,
      singular: singular,
      ucFirst: ucFirst
    };

    function contains(collection, value) {
      return collection.some(function (item) {
        return value.indexOf(item) > -1;
      });
    }

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