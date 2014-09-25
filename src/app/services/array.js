'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Array', ArrayService);

  function ArrayService() {

    return {
      contains: contains
    };

    function contains(collection, value) {
      return collection.some(function (item) {
        return value.indexOf(item) > -1;
      });
    }
  }

})();