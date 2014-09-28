'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('UserAuth', UserAuthService);

  UserAuthService.$inject = ['$firebaseSimpleLogin', 'Async', 'Config', 'Firebase', 'State', 'UserUtil'];

  function UserAuthService($firebaseSimpleLogin, Async, Config, Firebase, State, UserUtil) {

    var _provider = getAuthProvider();

    return {
      get: get,
      getAuthStatus: getAuthStatus,
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

    function getAuthStatus(authUser) {
      if (authUser) {
        return Async.when(authUser);
      } else {
        return Async.promise(login);
      }

      function login(deferred) {
        State.go('login');
        deferred.reject();
      }
    }

    function login(user) {
      return _provider.$login('password', user);
    }

    function logout() {
      _provider.$logout();
      UserUtil.clearUserName();
    }

    function register(formUser) {
      return _provider.$createUser(formUser.email, formUser.password);
    }
  }

})();