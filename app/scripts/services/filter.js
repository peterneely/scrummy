'use strict';

(function () {

  var filters = ['$filter', function ($filter) {

    var contains = function (collection, value) {
      return collection.some(function (item) {
        return value.indexOf(item) > -1;
      });
    };

    var dateFormat = function (date, format) {
      return $filter('date')(date, format);
    };

    var formatTime = function (value) {
      var regex = /(?:[^:.,])+/g;
      var matched;
      var elements = [];
      while(matched = regex.exec(value)){
        elements.push(('0' + matched[0]).substr(-2));
      }
      if(elements.length === 1){
        elements.push('00');
      }
      return elements.join(':');
    };

    var isNumeric = function (value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    var orderBy = function (collection, key) {
      return $filter('orderBy')(collection, key, false);
    };

    var removeTimeSeparator = function (value) {
      return value.replace(/[:.,]/, '');
    };

    var singular = function (value) {
      return value.replace(/[sS]+$/, '');
    };

    var ucFirst = function (value) {
      return $filter('ucfirst')(value);
    };

    var userName = function (email) {
      return email.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
    };

    var validTime = function (value) {
      return value.match(/^(?:0?[0-9]|1[0-9]|2[0-3])([:.,][0-5][0-9])?$/);
    };

    return {
      contains: contains,
      dateFormat: dateFormat,
      formatTime: formatTime,
      isNumeric: isNumeric,
      orderBy: orderBy,
      removeTimeSeparator: removeTimeSeparator,
      singular: singular,
      ucFirst: ucFirst,
      userName: userName,
      validTime: validTime
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Filter', filters);
})();