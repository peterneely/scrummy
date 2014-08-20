'use strict';

(function () {

  var bootstrapAppForLoginState = ['Location', 'Auth', 'User',
    function (Location, Auth, User) {

      var success = function (authUser) {
        User.setCurrentUser(authUser);
        Location.navigateTo('home');
      };

      var fail = function () {
        Location.navigateTo('login');
      };

      Auth.getCurrentUser().then(success, fail);
    }];

  angular
    .module('scrummyApp')
    .run(bootstrapAppForLoginState);
})();