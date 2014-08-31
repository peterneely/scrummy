'use strict';

(function () {

  var authService = ['$firebaseSimpleLogin', 'State', 'Url',
    function ($firebaseSimpleLogin, State, Url) {

      var ref = new Firebase(Url.data);
      var fb = $firebaseSimpleLogin(ref);

      var register = function (user) {
        return fb.$createUser(user.email, user.password);
      };

      var login = function (user) {
        return fb.$login('password', user);
      };

      var logout = function () {
        fb.$logout();
        State.go('home');
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