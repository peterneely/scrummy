'use strict';

(function () {
  var stringService = function () {

    var singular = function (text) {
      return text.slice(0, -1);
    };

    var initialCaps = function (text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return {
      singular: singular,
      initialCaps: initialCaps
    };
  };

  angular
    .module('scrummyApp')
    .factory('String', stringService);
})();