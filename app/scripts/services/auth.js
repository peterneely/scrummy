'use strict';

(function () {

  var authService = ['$firebaseSimpleLogin', 'State', 'Url',
    function ($firebaseSimpleLogin, State, Url) {

      var ref = new Firebase(Url.rootData);
      var fb = $firebaseSimpleLogin(ref);

      return {
        register: register,
        login: login,
        logout: logout,
        getAuthenticatedUser: getAuthenticatedUser
      };

      function register(user) {
        return fb.$createUser(user.email, user.password);
      }

      function login(user) {
        return fb.$login('password', user);
      }

      function logout() {
        fb.$logout();
        State.go('home');
      }

      function getAuthenticatedUser () {
        return fb.$getCurrentUser();
      }
    }];

  angular
    .module('scrummyApp')
    .factory('Auth', authService);
})();