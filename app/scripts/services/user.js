'use strict';

(function () {

  var userService = function () {

    var currentUser = null;

    var setCurrentUser = function (user) {
      currentUser = user;
    };

    var getCurrentUser = function () {
      return currentUser;
    };

    var isLoggedIn = function () {
      return currentUser !== null;
    };

    var removeCurrentUser = function () {
      currentUser = null;
    };

    return {
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
      isLoggedIn: isLoggedIn,
      removeCurrentUser: removeCurrentUser
    };
  };

  angular
    .module('scrummyApp')
    .factory('User', userService);
})();