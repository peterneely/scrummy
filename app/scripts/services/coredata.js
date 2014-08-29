'use strict';

(function () {

  var coreDataService = ['$q', '$firebase', 'Auth', 'Account', 'Location', 'URL',
    function ($q, $firebase, Auth, Account, Location, URL) {

      var _coreData = {
        user: null,
        clients: {
          store: null,
          array: null,
          resolved: null
        },
        projects: {
          store: null,
          array: null,
          resolved: null
        },
        tasks: {
          store: null,
          array: null,
          resolved: null
        }
      };

      var getAllPromise = function (user) {
        var deferred = $q.defer();
        $q.all(dataPromises(user)).then(function (resolvedData) {
          deferred.resolve(mapData(resolvedData));
        });
        return deferred.promise;
      };

      var getForType = function (type) {
        return _coreData[type];
      };

      var getUser = function () {
        return _coreData.user;
      };

      function dataPromises(user) {
        var types = ['clients', 'projects', 'tasks'];
        var promises = [];
        angular.forEach(types, function (type) {
          var url = URL.firebase + user.id + '/' + type;
          var store = $firebase(new Firebase(url));
          var array = store.$asArray();
          var promise = array.$loaded();
          promises.push(promise);
          _coreData.user = user;
          _coreData[type].store = store;
          _coreData[type].array = array;
        });
        return promises;
      }

      function mapData(results) {
        _coreData.clients.resolved = results[0];
        _coreData.projects.resolved = results[1];
        _coreData.tasks.resolved = results[2];
        return {
          clients: _coreData.clients,
          project: _coreData.projects,
          tasks: _coreData.tasks
        };
      }

      return {
        get: getAllPromise,
        forType: getForType,
        user: getUser
      };
    }];

  angular
    .module('scrummyApp')
    .factory('CoreData', coreDataService);
})();