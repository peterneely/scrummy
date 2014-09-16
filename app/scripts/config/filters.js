'use strict';

(function () {

  angular
    .module('scrummyApp')

    .filter('contains', contains)
    .filter('dayTitle', dayTitle)
    .filter('doubleDigits', doubleDigits)
    .filter('formatDateAsTime', formatDateAsTime)
    .filter('formatTime', formatTime)
    .filter('isNumeric', isNumeric)
    .filter('plural', plural)
    .filter('singular', singular)
    .filter('ucFirst', ucFirst)
    .filter('userFromAuthUser', userFromAuthUser)
    .filter('userName', userName)
    .filter('validTime', validTime);

  function contains() {
    return function (collection, value) {
      return collection.some(function (item) {
        return value.indexOf(item) > -1;
      });
    };
  }

  function dayTitle() {
    return function (dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
    };
  }

  function doubleDigits() {
    return function (value) {
      return ('0' + value).substr(-2);
    };
  }

  formatDateAsTime.$inject = ['$moment'];
  function formatDateAsTime($moment){
    return function(jsDate){
      return $moment(jsDate).format('HH:mm');
    }
  }

  function formatTime() {
    return function (value) {
      var regex = /(?:[^:.,])+/g;
      var matched;
      var elements = [];
      while ((matched = regex.exec(value))) {
        elements.push(doubleDigits()(matched[0]));
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

  userFromAuthUser.$inject = ['Config'];
  function userFromAuthUser(Config) {
    /*jshint camelcase: false */
    return function (authUser) {
      var email = authUser.email;
      var userName = userName()(email);
      return {
        userName: userName,
        email: email,
        pic: Config.urlPic + authUser.md5_hash + '?d=mm',
      };
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