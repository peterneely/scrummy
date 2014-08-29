'use strict';

(function () {

  var authService = ['$firebaseSimpleLogin', 'Location', 'URL',
    function ($firebaseSimpleLogin, Location, URL) {

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
        Location.go('home');
      };

      var getAuthenticatedUser = function () {
        return fb.$getCurrentUser();
      };

      return {
        register: register,
        login: login,
        logout: logout,
        getAuthenticatedUser: getAuthenticatedUser
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Auth', authService);
})();