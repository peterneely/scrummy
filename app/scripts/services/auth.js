'use strict';

(function () {

  var authService = ['$firebaseSimpleLogin', 'URL', function ($firebaseSimpleLogin, URL) {

    var ref = new Firebase(URL.firebase);
    var fb = $firebaseSimpleLogin(ref);

    var registerPromise = function (user) {
      return fb.$createUser(user.email, user.password);
    };

    var loginPromise = function (user) {
      return fb.$login('password', user);
    };

    var logout = function () {
      fb.$logout();
    };

    var getCurrentUserPromise = function () {
      return fb.$getCurrentUser();
    };

    return {
      register: registerPromise,
      login: loginPromise,
      logout: logout,
      getAuthenticatedUser: getCurrentUserPromise
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Auth', authService);
})();