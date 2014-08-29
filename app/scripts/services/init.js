'use strict';

(function () {

  var initService = ['$q', 'Auth', 'Account', 'CoreData', 'Location',
    function ($q, Auth, Account, CoreData, Location) {

      var onReload = function () {
        var deferred = $q.defer();
        Auth.getAuthenticatedUser().then(function (authUser) {
          if (authUser) {
            getUserAndData(deferred, authUser);
          } else {
            Location.go('login');
          }
        });
        return deferred.promise;
      };

      var onLogin = function (credentials) {
        var deferred = $q.defer();
        Auth.login(credentials).then(function (authUser) {
          getUserAndData(deferred, authUser);
        });
        return deferred.promise;
      };

      var onRegister = function (credentials) {
        var deferred = $q.defer();
        Auth.register(credentials).then(function (authUser) {
          getUserAndData(deferred, authUser);
        });
        return deferred.promise;
      };

      function getUserAndData(deferred, authUser) {
        Account.getAccountUser(authUser).then(function (user) {
          CoreData.get(user).then(function (data) {
            console.log(data);
            deferred.resolve({
              authUser: authUser,
              user: user,
              data: data
            });
          });
        });
      }

      return {
        onReload: onReload,
        onLogin: onLogin,
        onRegister: onRegister
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Init', initService);
})();