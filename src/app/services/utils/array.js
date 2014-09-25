'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Array', ArrayService);

  function ArrayService() {

    return {
      contains: contains,
      group: group,
      sortDesc: sortDesc,
      where: where
    };

    function contains(collection, value) {
      return collection.some(function (item) {
        return value.indexOf(item) > -1;
      });
    }

    function group(seq, keys) {
      if (!keys.length) {
        return seq;
      }
      var first = keys[0];
      var rest = keys.slice(1);
      return _.mapValues(_.groupBy(seq, first), function (value) {
        return group(value, rest);
      });
    }

    function sortDesc(array){
      return _.sortBy(array).reverse();
    }

    function where(items, callback){
      return _.where(items, callback);
    }
  }

})();