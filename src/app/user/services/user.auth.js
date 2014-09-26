'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('UserAuth', UserAuthService);

  UserAuthService.$inject = ['$firebaseSimpleLogin', 'Config', 'Firebase', 'UserUtil'];

  function UserAuthService($firebaseSimpleLogin, Config, Firebase, UserUtil) {

    var _provider = getAuthProvider();

    return {
      get: get,
      login: login,
      logout: logout,
      register: register
    };

    function getAuthProvider() {
      return $firebaseSimpleLogin(new Firebase(Config.urlAuth));
    }

    function get() {
      return _provider.$getCurrentUser();
    }

    function login(user) {
      return _provider.$login('password', user);
    }

    function logout() {
      _provider.$logout();
      UserUtil.clearUserName();
    }

    function register(formUser){
      return _provider.$createUser(formUser.email, formUser.password);
    }
  }

})();