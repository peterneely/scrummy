'use strict';

(function () {

  var startService = ['$q', 'Location', 'Auth', 'User', 'Account', 'Data',
    function ($q, Location, Auth, User, Account, Data) {

      var coreData = function () {
        var deferred = $q.defer();
        User.afterLogin().then(function (user) {
          deferred.resolve(Data.core(user));
        });
        return deferred.promise;
      };

      return {
        getCoreData: coreData
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Start', startService);
})();