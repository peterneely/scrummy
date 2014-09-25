'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Util', UtilService);

  UtilService.$inject = ['Array', 'Date', 'Obj', 'String'];

  function UtilService(Array, Date, Obj, String) {

    return {
      contains: Array.contains,
      doubleDigits: String.doubleDigits,
      elapsed: Date.elapsed,
      format: Date.format,
      group: Array.group,
      has: Obj.has,
      isEmpty: Obj.isEmpty,
      isoWeek: Date.isoWeek,
      isoWeekDay: Date.isoWeekDay,
      isToday: Date.isToday,
      merge: Obj.merge,
      now: Date.now,
      nowNoSeconds: Date.nowNoSeconds,
      plural: String.plural,
      singular: String.singular,
      sortDesc: Array.sortDesc,
      ucFirst: String.ucFirst,
      where: Array.where
    };
  }

})();