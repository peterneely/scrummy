'use strict';

(function () {

  var startService = ['$q', 'Location', 'Auth', 'User', 'Account', 'Data',
    function ($q, Location, Auth, User, Account, Data) {

      var coreData = function () {
        var deferred = $q.defer();

        Auth.getCurrentUser()
          .then(function (authUser) {

            if (authUser) {
              Account.getCoreData(authUser).then(function (user) {

                User.setCurrentUser(user);

                Data.core(user).then(function (data) {
                  console.log(data);
                  return deferred.resolve(data);
                });
              });
            } else {
              Location.go('login');
            }

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