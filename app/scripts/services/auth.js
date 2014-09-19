'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Auth', AuthService);

  AuthService.$inject = ['$firebaseSimpleLogin', 'State', 'Config'];

  function AuthService($firebaseSimpleLogin, State, Config) {

    var provider = getAuthProvider();

    return {
      getAuthenticatedUser: getAuthenticatedUser,
      login: login,
      logout: logout,
      register: register
    };

    function getAuthProvider() {
      var ref = new Firebase(Config.urlAuth);
      return $firebaseSimpleLogin(ref);
    }

    function getAuthenticatedUser() {
      return provider.$getCurrentUser();
    }

    function login(user) {
      return provider.$login('password', user);
    }

    function logout() {
      provider.$logout();
      State.go('home');
    }

    function register(user) {
      return provider.$createUser(user.email, user.password);
    }
  }

})();