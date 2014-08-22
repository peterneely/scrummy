'use strict';

(function () {

  var userService = ['URL', function (URL) {

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

    // See https://en.gravatar.com/site/implement/images/
    var picUrl = function () {
      var userId = currentUser.md5_hash;
      var defaultPic = '?d=mm';
      return URL.gravatar + userId + defaultPic;
    };

    return {
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
      isLoggedIn: isLoggedIn,
      removeCurrentUser: removeCurrentUser,
      picUrl: picUrl
    };
  }];

  angular
    .module('scrummyApp')
    .factory('User', userService);
})();