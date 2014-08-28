'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'URL',
    function ($q, $firebase, URL) {

      var _user = null;

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

      var coreData = function (user) {
        _user = user;
        var deferred = $q.defer();

        var types = ['clients', 'projects', 'tasks'];
        var promises = [];
        angular.forEach(types, function (type) {

          _promise[type] = dataArray(type);
          var promise = _promise[type].$loaded();
          promises.push(promise);
        });

        $q.all(promises).then(function (results) {
          _data.clients = results[0];
          _data.projects = results[1];
          _data.tasks = results[2];

          deferred.resolve(_data);
        });

        return deferred.promise;
      };

      function dataArray(type) {
        return data(type).$asArray();
      }

      function data(type) {
        var url = URL.firebase + _user.id + '/' + type;
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