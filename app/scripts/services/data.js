'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'Auth', 'Account', 'Location', 'URL',
    function ($q, $firebase, Auth, Account, Location, URL) {

      var _coreData = {
        loaded: [],
        data: {
          user: null,
          clients: {
            store: null,
            data: []
          },
          projects: {
            store: null,
            data: []
          },
          tasks: {
            store: null,
            data: []
          }
        }
      };

      var getCoreData = function(){
        return _coreData;
      };

      function setCoreData(user, data){
        _coreData[key] = value;
      }

      var loadInitial = function (currentData, dataTypes) {
        var deferred = $q.defer();
        getUser(currentData).then(function (user) {
          getData(currentData, dataTypes, user).then(function(data){
            cacheData(data);
            deferred.resolve(data);
          });
        });
        return deferred.promise;
      };

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

      var get = function (type) {
        return _coreData[type].resolved;
      };

      var add = function (type, object) {
        return _coreData[type].store.$push(object);
      };

      var update = function (type, object) {
        return _coreData[type].array.$save(object);
      };

      var remove = function (type, object) {
        _coreData[type].array.$remove(object);
      };

      return {
        getCoreData: getCoreData,
        loadInitial: loadInitial,
        get: get,
        add: add,
        update: update,
        remove: remove
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Data', dataService);
})();