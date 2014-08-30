'use strict';

(function () {

  var initService = ['$q', 'Cache', 'Data', 'Auth', 'Account', 'Location', 'TYPE',
    function ($q, Cache, Data, Auth, Account, Location, TYPE) {

      var data = function (types) {
        var deferred = $q.defer();
        types = types || [TYPE.clients, TYPE.projects, TYPE.tasks];
        getUser().then(function (user) {
          getData(user, types).then(function (data) {
            console.log(data, Cache);
            deferred.resolve(data);
          });
        });
        return deferred.promise;
      };

      function getUser() {
        var deferred = $q.defer();
        if (Cache.data[TYPE.user] !== null) {
          deferred.resolve(fromCache(TYPE.user));
        } else {
          Auth.getAuthenticatedUser().then(function (authUser) {
            if (authUser) {
              Account.getAccountUser(authUser).then(function (user) {
                Cache.data.user = user;
                Cache.cached.push(TYPE.user);
                deferred.resolve(user);
              });
            } else {
              Location.go('login');
            }
          });
        }
        return deferred.promise;
      }

      function getData(user, types) {
        var deferred = $q.defer();
        angular.forEach(types, function (type) {
          if (Cache.data[type] === null) {
            var resource = Data.getResource(user, type);
            Data.load(resource).then(function (data) {
              Cache.cached.push(type);
              Cache.data[type] = data;
              Cache.resources[type] = resource;
              deferred.resolve(Cache);
            });
          }
        });
        return deferred.promise;
      }

      function fromCache(type) {
        return Cache.data[type];
      }

      return {
        data: data
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Init', initService);
})();