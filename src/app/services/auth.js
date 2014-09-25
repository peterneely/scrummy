'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Auth', AuthService);

  AuthService.$inject = ['$firebaseSimpleLogin', 'Config', 'User'];

  function AuthService($firebaseSimpleLogin, Config, User) {

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
      User.clearUserName();
    }

    function register(formUser){
      return _provider.$createUser(formUser.email, formUser.password);
    }
  }

})();