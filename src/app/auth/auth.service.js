'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Auth', AuthService);

  AuthService.$inject = ['$firebaseSimpleLogin', 'Config'];

  function AuthService($firebaseSimpleLogin, Config) {

    var _provider = getAuthProvider();

    return {
      getAuthUser: getAuthUser,
      login: login,
      logout: logout,
      register: register
    };

    function getAuthProvider() {
      return $firebaseSimpleLogin(new Firebase(Config.urlAuth));
    }

    function getAuthUser() {
      return _provider.$getCurrentUser();
    }

    function login(user) {
      return _provider.$login('password', user);
    }

    function logout() {
      _provider.$logout();
    }

    function register(user){
      return _provider.$createUser(user.email, user.password);
    }
  }

})();