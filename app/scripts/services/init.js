'use strict';

(function () {

  var initService = ['$q', 'Data', 'Auth', 'Account', 'State',
    function ($q, Data, Auth, Account, State) {

      var getInitial = function () {
        var deferred = $q.defer();
        getUser().then(function (user) {
          getData(user).then(function (data) {
            deferred.resolve(Data.coreData = data);
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
        var deferred = $q.defer();
        var types = ['clients', 'projects', 'tasks'];
        angular.forEach(types, function (type) {
          var dataPromise = Data.dataResource(user, type).$asArray().$loaded();
          dataPromise.then(function (data) {
            deferred.resolve(data);
          });
        });
        return deferred.promise;
      }

      return {
        getInitial: getInitial
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Init', initService);
})();