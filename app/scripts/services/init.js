'use strict';

(function () {

  var initService = ['$q', 'Data', 'Auth', 'Account', 'State',
    function ($q, Data, Auth, Account, State) {

      var getCoreData = function () {
        var deferred = $q.defer();
        getUser().then(function (user) {
          $q.all(getData(user)).then(function (data) {
            deferred.resolve(viewData(user, data));
          });
        });
        return deferred.promise;
      };

      function getUser() {
        var deferred = $q.defer();
        Auth.getAuthenticatedUser().then(function (authUser) {
          if (authUser) {
            Account.getUser(authUser).then(function (user) {
              deferred.resolve(user);
            });
          } else {
            State.go('login');
          }
        });
        return deferred.promise;
      }

      function getData(user) {
        var promises = [];
        ['clients', 'projects', 'tasks'].forEach(function (type) {
          var promise = Data.dataResource(user, type).$asArray().$loaded();
          promises.push(promise);
        });
        return promises;
      }

      function viewData(user, data){
        return {
          user: user,
          clients: data[0],
          projects: data[1],
          tasks: data[2]
        };
      }

      return {
        getCoreData: getCoreData
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Init', initService);
})();