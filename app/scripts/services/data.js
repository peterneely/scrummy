'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'User', 'URL',
    function ($q, $firebase, User, URL) {

      var _promise = {
        clients: null,
        projects: null,
        tasks: null
      };

      var _data = {
        clients: null,
        projects: null,
        tasks: null
      };

      var coreData = function () {
        var deferred = $q.defer();
        User.getFromAuthUser().then(function () {
          $q.all(coreDataPromises()).then(function (resolvedData) {
            deferred.resolve(map(resolvedData));
          });
        });
        return deferred.promise;
      };

      function coreDataPromises() {
        var types = ['clients', 'projects', 'tasks'];
        var promises = [];
        angular.forEach(types, function (type) {
          _promise[type] = dataArray(type);
          var promise = _promise[type].$loaded();
          promises.push(promise);
        });
        return promises;
      }

      function map(results) {
        _data.clients = results[0];
        _data.projects = results[1];
        _data.tasks = results[2];
        return _data;
      }

      function dataArray(type) {
        return data(type).$asArray();
      }

      function data(type) {
        var url = URL.firebase + User.getCurrentUser().id + '/' + type;
        return $firebase(new Firebase(url));
      }

      var all = function (type) {
        return _data[type];
      };

      var add = function (type, object) {
        return data(type).$push(object);
      };

      var remove = function (type, object) {
        _promise[type].$remove(object);
      };

      var update = function (type, object) {
        return _promise[type].$save(object);
      };

      return {
        core: coreData,
        all: all,
        add: add,
        remove: remove,
        update: update
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Data', dataService);
})();