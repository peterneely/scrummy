'use strict';

(function () {

  var bootstrapAppForUser = ['$location', 'Auth', 'User', 'URL',
    function ($location, Auth, User, URL) {

      var success = function (authUser) {
        User.setCurrentUser(authUser);
        $location.path(URL.home);
      };

      var fail = function () {
        $location.path(URL.login);
      };

      Auth.getCurrentUser().then(success, fail);
    }];

  angular
    .module('scrummyApp')
    .run(bootstrapAppForUser);
})();