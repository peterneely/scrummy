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

      var get = function () {
        var deferred = $q.defer();
        Auth.getAuthenticatedUser().then(function (authUser) {
          if (authUser) {
            Account.getAccountUser(authUser).then(function (user) {
              $q.all(dataPromises(user)).then(function (data) {
                deferred.resolve(map(data));
              });
            });
          } else {
            Location.go('login');
          }
        });
        return deferred.promise;
      };

      var forType = function (type) {
        return _coreData[type];
      };

      var user = function () {
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

      function map(data) {
        _coreData.clients.resolved = data[0];
        _coreData.projects.resolved = data[1];
        _coreData.tasks.resolved = data[2];
        return _coreData;
      }

      return {
        get: get,
        forType: forType,
        user: user
      };
    }];

  angular
    .module('scrummyApp')
    .factory('CoreData', coreDataService);
})();