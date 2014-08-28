'use strict';

(function () {

  var userService = ['$q', '$rootScope', 'Auth', 'Account', 'Location', 'URL',
    function ($q, $rootScope, Auth, Account, Location, URL) {

      var currentUser = null;

      var setCurrentUser = function (user) {
        currentUser = user;
      };

      var getCurrentUser = function () {
        return currentUser;
      };

      var afterLogin = function () {
        var deferred = $q.defer();
        Auth.getCurrentUser().then(function (authUser) {
          if (authUser) {
            Account.getUser(authUser).then(function (user) {
              currentUser = user;
              deferred.resolve(user);
            });
          } else {
            Location.go('login');
          }
        });
        return deferred.promise;
      };

      var isLoggedIn = function () {
        return currentUser !== null;
      };

      var whenLoggedIn = function (callback) {
        return $rootScope.$watch(isLoggedIn, function (loggedIn) {
          if (loggedIn) {
            callback();
          }
        });
      };

      var whenLoggedOut = function (callback) {
        return $rootScope.$watch(isLoggedIn, function (loggedIn) {
          if (!loggedIn) {
            callback();
          }
        });
      };

      // See https://en.gravatar.com/site/implement/images/
      var picUrl = function () {
        if (currentUser) {
          var userId = currentUser.hash;
          var defaultPic = '?d=mm';
          return URL.gravatar + userId + defaultPic;
        }
      };

      var removeCurrentUser = function () {
        currentUser = null;
      };

      return {
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser,
        afterLogin: afterLogin,
        isLoggedIn: isLoggedIn,
        whenLoggedIn: whenLoggedIn,
        whenLoggedOut: whenLoggedOut,
        picUrl: picUrl,
        removeCurrentUser: removeCurrentUser
      };
    }];

  angular
    .module('scrummyApp')
    .factory('User', userService);
})();