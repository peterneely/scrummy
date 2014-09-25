'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Util', UtilService);


  UtilService.$inject = ['Array', 'Date', 'Obj', 'String'];

  function UtilService(Array, Date, Obj, String) {

    return {
      contains: Array.contains,
      group: Array.group,
      sortDesc: Array.sortDesc,
      where: Array.where,

      elapsed: Date.elapsed,
      format: Date.formatDate,
      isToday: Date.isToday,
      isoWeek: Date.isoWeek,
      isoWeekDay: Date.isoWeekDay,
      now: Date.now,
      nowNoSeconds: Date.nowNoSeconds,

      has: Obj.has,
      isEmpty: Obj.isEmpty,
      merge: Obj.merge,

      doubleDigits: String.doubleDigits,
      plural: String.plural,
      singular: String.singular,
      ucFirst: String.ucFirst
    };
  }

})();