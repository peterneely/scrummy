'use strict';

(function () {

  var run = ['$location', 'Auth', 'User',
    function ($location, Auth, User) {

      var success = function (authUser) {
        User.setCurrentUser(authUser);
      };

      var fail = function () {
        $location.path('/login');
      };

      Auth.getCurrentUser().then(success, fail);
    }];

  angular
    .module('scrummyApp')
    .run(run);
})();