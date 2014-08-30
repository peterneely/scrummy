'use strict';

(function () {

  var initService = ['$q', '$firebase', 'Cache', 'Auth', 'Account', 'Location', 'URL',
    function ($q, $firebase, Cache, Auth, Account, Location, URL) {

      var data = function (dataTypes) {
        var deferred = $q.defer();
        load(dataTypes).then(function (coreData) {
          deferred.resolve(cache(coreData));
        });
        return deferred.promise;
      };

      function load(dataTypes) {
        var deferred = $q.defer();
        getUser().then(function (user) {
          getData(user, dataTypes).then(function (coreData) {
            deferred.resolve(coreData);
          });
        });
        return deferred.promise;
      }

      function cache(coreData) {
        return Cache.cacheData(coreData);
      }

//      var loadInitial = function (currentData, typesToLoad) {
//        var deferred = $q.defer();
//        getUser(currentData).then(function (user) {
//          $q.all(dataPromises(user, typesToLoad)).then(function (data) {
//            setCoreData(user, data);
//            deferred.resolve(getCoreData());
//          });
//        });
//        return deferred.promise;
//      };

      function getUser(coreData) {
        var deferred = $q.defer();
        var user = coreData.user;
        if (user) {
          deferred.resolve(user);
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

      function dataPromises(user, types) {
        var baseUrl = URL.firebase + user.id + '/';
        var promises = [];
        angular.forEach(types, function (type) {
          var url = baseUrl + type;
          var store = $firebase(new Firebase(url));
          _coreData[type].store = store;
          var promise = store.$asArray().$loaded();
          promises.push(promise);
        });
        return promises;
      }

      function map(data) {
        _coreData.clients.data = data[0];
        _coreData.projects.data = data[1];
        _coreData.tasks.data = data[2];
        return _coreData;
      }

      return {
        data: data
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Init', initService);
})();