'use strict';

(function () {

  var startService = ['$q', 'Location', 'Auth', 'User', 'Account', 'Data',
    function ($q, Location, Auth, User, Account, Data) {

      var coreData = function () {
        var deferred = $q.defer();
        user().then(function (user) {
          deferred.resolve(Data.core(user));
        });
        return deferred.promise;
      };

      function user(){
        var deferred = $q.defer();
        Auth.getCurrentUser().then(function (authUser) {
          if (authUser) {
            Account.getUser(authUser).then(function (user) {
              User.setCurrentUser(user);
              deferred.resolve(user);
            });
          } else {
            Location.go('login');
          }
        });
        return deferred.promise;
      }

      return {
        getCoreData: coreData
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Start', startService);
})();