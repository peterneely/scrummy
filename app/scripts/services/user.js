'use strict';

(function () {
  
  var userService = ['$firebaseSimpleLogin', 'FIREBASE_URL',
    function ($firebaseSimpleLogin, FIREBASE_URL) {

      var ref = new Firebase(FIREBASE_URL);
      var fb = $firebaseSimpleLogin(ref);
      var authUser = {};

      var setCurrentUser = function (user) {
        authUser = user;
      };

      var getCurrentUser = function () {
        return authUser;
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