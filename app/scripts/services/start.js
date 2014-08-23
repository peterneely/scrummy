'use strict';

(function () {

  var startService = ['Location', 'Auth', 'User', 'Account',
    function (Location, Auth, User, Account) {

      var getUser = function () {
        Auth.getCurrentUser().then(success, fail);
      };

      var success = function (authUser) {
        if (authUser) {
          userLoggedIn(authUser);
        } else {
          userNotLoggedIn();
        }
      };

      var fail = function () {
        Location.go('home');
      };

      function userLoggedIn(authUser) {
        Account.getUser(authUser).then(setUser, fail);
      }

      function setUser(user) {
        User.setCurrentUser(user);
      }

      function userNotLoggedIn() {
        Location.go('login');
      }

      return {
        getUser: getUser
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Start', startService);
})();