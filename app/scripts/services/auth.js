'use strict';

(function () {

  var authService = ['$firebaseSimpleLogin', 'FIREBASE_URL',
    function ($firebaseSimpleLogin, FIREBASE_URL) {

      var ref = new Firebase(FIREBASE_URL);
      var fb = $firebaseSimpleLogin(ref);

      var register = function (user) {
        return fb.$createUser(user.email, user.password);
      };

      var signin = function (user) {
        return fb.$login('password', user);
      };

      return {
        register: register,
        signin: signin
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Auth', authService);
})();