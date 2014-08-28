'use strict';

(function () {

  var coreDataService = ['$q', '$firebase', 'User', function ($q, $firebase, User) {

    var _coreData = {
      clients: {
        store: null,
        array: null,
        promise: null,
        resolved: null
      },
      projects: {
        store: null,
        array: null,
        promise: null,
        resolved: null
      },
      tasks: {
        store: null,
        array: null,
        promise: null,
        resolved: null
      }
    };

    var get = function () {
      var deferred = $q.defer();
      User.getFromAuthUser().then(function (user) {
        $q.all(dataPromises(user)).then(function (resolvedData) {
          deferred.resolve(map(resolvedData));
        });
      });
      return deferred.promise;
    };

    var forType = function (type) {
      return _coreData[type];
    };

    function dataPromises(user) {
      var types = ['clients', 'projects', 'tasks'];
      var promises = [];
      angular.forEach(types, function (type) {
        var url = 'https://scrummy.firebaseio.com/users/' + user.id + '/' + type;
        var store = $firebase(new Firebase(url));
        var array = store.$asArray();
        var promise = array.$loaded();
        _coreData[type].store = store;
        _coreData[type].array = array;
        _coreData[type].promise = promise;
        promises.push(promise);
      });
      return promises;
    }

    function map(results) {
      _coreData.clients.resolved = results[0];
      _coreData.projects.resolved = results[1];
      _coreData.tasks.resolved = results[2];
      return _coreData;
    }

    return {
      get: get,
      forType: forType
    };
  }];

  angular
    .module('scrummyApp')
    .factory('CoreData', coreDataService);
})();