'use strict';

(function () {

  var initService = ['$q', 'Cache', 'Data', 'Auth', 'Account', 'Location', 'TYPE',
    function ($q, Cache, Data, Auth, Account, Location, TYPE) {

      var data = function (types) {
        var deferred = $q.defer();
        types = types || [TYPE.clients, TYPE.projects, TYPE.tasks];
        load(types).then(function (data) {
          cache(data);
          deferred.resolve(data);
        });
        return deferred.promise;
      };

      function load(dataTypes) {
        var deferred = $q.defer();
        getUser().then(function (user) {
          getData(user, dataTypes).then(function (data) {
            deferred.resolve(data);
          });
        });
        return deferred.promise;
      }

      function cache(data) {
        Cache.cache(data);
      }

      function getUser() {
        var deferred = $q.defer();
        if (isCached(TYPE.user)) {
          deferred.resolve(fromCache(TYPE.user));
        } else {
          Auth.getAuthenticatedUser().then(function (authUser) {
            if (authUser) {
              Account.getAccountUser(authUser).then(function (user) {
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
        var coreData = {
          data: {
            user: user
          }
        };
//        var coreData = {
//          cached: [],
//          data: {},
//          resources: {}
//        };
        angular.forEach(types, function (type) {
          if (!isCached(type)) {
            var resource = Data.getResource(user, type);
            Data.load(resource).then(function (data) {
              coreData.cached.push(type);
              coreData.data[type] = data;
              coreData.resources[type] = resource;
            });
          }
        });
        deferred.resolve(coreData);
        return deferred.promise;
      }

      function isCached(type) {
        return Cache.isCached(type);
      }

      function fromCache(type) {
        return Cache.getData(type);
      }

      return {
        data: data
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Init', initService);
})();