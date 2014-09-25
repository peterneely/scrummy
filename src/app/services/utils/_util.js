'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Util', UtilService);

  UtilService.$inject = ['Array', 'Date', 'Obj', 'String'];

  function UtilService(Array, Date, Obj, String) {

    return {
      array: {
        contains: Array.contains,
        group: Array.group,
        sortDesc: Array.sortDesc,
        where: Array.where
      },
      date: {
        elapsed: Date.elapsed,
        format: Date.format,
        isToday: Date.isToday,
        isoWeek: Date.isoWeek,
        isoWeekDay: Date.isoWeekDay,
        now: Date.now,
        nowNoSeconds: Date.nowNoSeconds
      },
      object: {
        has: Obj.has,
        isEmpty: Obj.isEmpty,
        merge: Obj.merge
      },
      string: {
        doubleDigits: String.doubleDigits,
        plural: String.plural,
        singular: String.singular,
        ucFirst: String.ucFirst
      }
    };
  }

})();