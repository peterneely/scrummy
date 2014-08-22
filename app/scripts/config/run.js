'use strict';

(function () {

  var setDefaultView = ['Location', 'Auth', 'User',
    function (Location, Auth, User) {

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
        User.setCurrentUser(authUser);
//        Location.go('timesheet');
      }

      function userNotLoggedIn() {
//        Location.go('home');
      }

      Auth.getCurrentUser().then(success, fail);
    }];

  angular
    .module('scrummyApp')
    .run(setDefaultView);
})();