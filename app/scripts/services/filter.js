'use strict';

(function () {

  var filters = ['$filter', function ($filter) {

    var contains = function (collection, value) {
      return $filter('contains')(collection, value);
    };

    var dateFormat = function (date, format) {
      return $filter('date')(date, format);
    };

    var isNumeric = function (value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    var orderBy = function (collection, key) {
      return $filter('orderBy')(collection, key, false);
    };

    var singular = function (value) {
      return value.replace(/[sS]+$/, '');
    };

    var ucFirst = function (value) {
      return $filter('ucfirst')(value);
    };

    return {
      contains: contains,
      dateFormat: dateFormat,
      isNumeric: isNumeric,
      orderBy: orderBy,
      singular: singular,
      ucFirst: ucFirst
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Filter', filters);
})();