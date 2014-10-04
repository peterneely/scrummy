'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Fn', FnService);

  FnService.$inject = ['_'];

  function FnService(_) {

    return {
      contains: contains,
      deleteProperties: deleteProperties,
      doubleDigits: doubleDigits,
      group: group,
      groupBy: groupBy,
      has: has,
      isEmpty: isEmpty,
      merge: merge,
      plural: plural,
      singular: singular,
      sortDesc: sortDesc,
      sortDescBy: sortDescBy,
      ucFirst: ucFirst,
      where: where
    };

    function contains(collection, value) {
      return collection.some(function (item) {
        return value.indexOf(item) > -1;
      });
    }

    function deleteProperties(object, properties){
      properties.forEach(function(property){
        delete object[property];
      });
      return object;
    }

    function doubleDigits(value) {
      return ('0' + value).substr(-2);
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

    function groupBy(items, by){
      return _.groupBy(items, by);
    }

    function has(object, property){
      return _.has(object, property);
    }

    function isEmpty(item) {
      return _.isEmpty(item);
    }

    function merge(obj1, obj2){
      return _.merge(_.cloneDeep(obj1), _.cloneDeep(obj2));
    }

    function plural(value) {
      return value + 's';
    }

    function singular(value) {
      return value.replace(/[sS]+$/, '');
    }

    function sortDesc(array){
      return _.sortBy(array).reverse();
    }

    function sortDescBy(array, by){
      return _.sortBy(array, by).reverse();
    }

    function ucFirst(value) {
      return value.replace(/(^|[\. ])\s*./g, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1);
      });
    }

    function where(items, callback){
      return _.where(items, callback);
    }
  }

})();