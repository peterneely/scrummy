'use strict';

(function () {

  var userService = ['$rootScope', 'URL', function ($rootScope, URL) {

    var currentUser = null;

    var setCurrentUser = function (user) {
      currentUser = user;
    };

    var ready = function (callback) {
      return $rootScope.$watch(getCurrentUser, function (currentUser) {
        if (currentUser !== null) {
          callback();
        }
      });
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
      if (currentUser) {
        var userId = currentUser.hash;
        var defaultPic = '?d=mm';
        return URL.gravatar + userId + defaultPic;
      }
    };

    return {
      setCurrentUser: setCurrentUser,
      ready: ready,
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