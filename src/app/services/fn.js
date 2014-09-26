'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Fn', FnService);

  FnService.$inject = ['$moment'];

  function FnService($moment) {

    return {
      contains: contains,
      doubleDigits: doubleDigits,
      elapsed: elapsed,
      format: formatDate,
      group: group,
      has: has,
      isEmpty: isEmpty,
      isoWeek: isoWeek,
      isoWeekDay: isoWeekDay,
      isToday: isToday,
      merge: merge,
      now: now,
      nowNoSeconds: nowNoSeconds,
      plural: plural,
      singular: singular,
      sortDesc: sortDesc,
      ucFirst: ucFirst,
      where: where
    };

    function contains(collection, value) {
      return collection.some(function (item) {
        return value.indexOf(item) > -1;
      });
    }

    function doubleDigits(value) {
      return ('0' + value).substr(-2);
    }

    function elapsed(start, end) {
      var ms = $moment(end).diff($moment(start));
      return $moment(ms).format('H') + $moment(ms).format(':mm');
    }

    function formatDate(date, format){
      return $moment(date).format(format);
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

    function has(object, property){
      return _.has(object, property);
    }

    function isEmpty(item) {
      return _.isEmpty(item);
    }

    function isoWeek(date){
      return $moment(date).isoWeek();
    }

    function isoWeekDay(date){
      return $moment(date).isoWeekday();
    }

    function isToday(date) {
      return $moment(date).isSame($moment(new Date()), 'day');
    }

    function merge(obj1, obj2){
      return _.merge(obj1, obj2);
    }

    function now(){
      return new Date();
    }

    function nowNoSeconds(){
      return new Date().setSeconds(0);
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