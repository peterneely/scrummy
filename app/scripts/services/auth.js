'use strict';

(function () {

  var authService = ['$firebaseSimpleLogin', 'URL', function ($firebaseSimpleLogin, URL) {

    var ref = new Firebase(URL.firebase);
    var fb = $firebaseSimpleLogin(ref);

    var register = function (user) {
      return fb.$createUser(user.email, user.password);
    };

    var login = function (user) {
      return fb.$login('password', user);
    };

    var logout = function () {
      fb.$logout();
    };

    var getCurrentUser = function () {
      return fb.$getCurrentUser();
    };

    return {
      register: register,
      login: login,
      logout: logout,
      getCurrentUser: getCurrentUser
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Auth', authService);
})();