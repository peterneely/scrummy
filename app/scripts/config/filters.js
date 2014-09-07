'use strict';

(function () {

  angular
    .module('scrummyApp')

    .filter('contains', contains)
    .filter('formatTime', formatTime)
    .filter('isNumeric', isNumeric)
    .filter('plural', plural)
    .filter('singular', singular)
    .filter('ucFirst', ucFirst)
    .filter('userName', userName)
    .filter('validTime', validTime);

  function contains() {
    return function (collection, value) {
      return collection.some(function (item) {
        return value.indexOf(item) > -1;
      });
    };
  }

  function formatTime() {
    return function (value) {
      var regex = /(?:[^:.,])+/g;
      var matched;
      var elements = [];
      while ((matched = regex.exec(value))) {
        elements.push(('0' + matched[0]).substr(-2));
      }
      if (elements.length === 1) {
        elements.push('00');
      }
      return elements.join(':');
    };
  }

  function isNumeric() {
    return function (value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };
  }

  function plural() {
    return function (value) {
      return value + 's';
    };
  }

  function singular() {
    return function (value) {
      return value.replace(/[sS]+$/, '');
    };
  }

  function ucFirst() {
    return function (value) {
      return value.replace(/(^|[\. ])\s*./g, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1);
      });
    };
  }

  function userName() {
    return function (email) {
      return email.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
    };
  }

  function validTime() {
    return function (value) {
      return value.match(/^(?:0?[0-9]|1[0-9]|2[0-3])([:.,][0-5][0-9])?$/);
    };
  }

})();