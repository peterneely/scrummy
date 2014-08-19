'use strict';

(function () {

  var authService = ['$firebaseSimpleLogin', 'FIREBASE_URL',
    function ($firebaseSimpleLogin, FIREBASE_URL) {

      var ref = new Firebase(FIREBASE_URL);
      var fb = $firebaseSimpleLogin(ref);

      var register = function (user) {
        return fb.$createUser(user.email, user.password);
      };

      var login = function (user) {
        return fb.$login('password', user);
      };

      var logout = function() {
        fb.$logout();
      };

      return {
        register: register,
        login: login,
        logout: logout
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Auth', authService);
})();