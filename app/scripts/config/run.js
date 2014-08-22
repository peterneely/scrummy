'use strict';

(function () {

  var setDefaultView = ['Location', 'Auth', 'User', 'Account',
    function (Location, Auth, User, Account) {

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

      Auth.getCurrentUser().then(success, fail);
    }];

  angular
    .module('scrummyApp')
    .run(setDefaultView);
})();