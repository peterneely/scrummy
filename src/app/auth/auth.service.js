'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Auth', AuthService);

  AuthService.$inject = ['$q', '$firebaseSimpleLogin', 'Config'];

  function AuthService($q, $firebaseSimpleLogin, Config) {

    var _authUser = null;
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
      var result = _authUser || resolve(_provider.$getCurrentUser());
      return result;
    }

    function login(user) {
      return resolve(_provider.$login('password', user));
    }

    function logout() {
      _provider.$logout();
      _authUser = null;
    }

    function register(user) {
      return resolve(_provider.$createUser(user.email, user.password));
    }

    function resolve(asyncTask) {
      var deferred = $q.defer();
      asyncTask.then(function (authUser) {
        _authUser = authUser;
        deferred.resolve(_authUser);
      });
      return deferred.promise;
    }
  }

})();