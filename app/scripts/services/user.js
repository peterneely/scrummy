'use strict';

(function () {

  var userService = ['$rootScope', '$firebaseSimpleLogin', 'FIREBASE_URL',
    function ($rootScope, $firebaseSimpleLogin, FIREBASE_URL) {

      var ref = new Firebase(FIREBASE_URL);
      var fb = $firebaseSimpleLogin(ref);

      var setCurrentUser = function (user) {
        $rootScope.user = user;
      };

      var getCurrentUser = function () {
        return $rootScope.user;
      };

      return {
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser
      };
    }];

  angular
    .module('scrummyApp')
    .factory('User', userService);
})();