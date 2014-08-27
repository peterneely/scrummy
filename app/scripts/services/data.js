'use strict';

(function () {

  var dataService = ['$q', '$firebase', '$state', 'URL', 'User',
    function ($q, $firebase, $state, URL, User) {

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

      var promiseToHaveAll = function () {
        var deferred = $q.defer();
        var types = ['clients', 'projects', 'tasks'];
        angular.forEach(types, function (type) {
          promiseToHave(type, deferred);
        });
        return deferred.promise;
      };

      function promiseToHave(type, deferred){
        if (_data[type] === null) {
          var promise = _promise[type] = dataPromise(type);
          promise.$loaded().then(function (data) {
            deferred.resolve(_data[type] = data);
          });
        } else {
          deferred.resolve(_data[type]);
        }
      }

      function dataPromise(type) {
        return dataRef(type).$asArray();
      }

      function dataRef(type){
        var currentUser = User.getCurrentUser();
        var url = URL.firebase + currentUser.id + '/' + type;
        return $firebase(new Firebase(url));
      }

      var all = function (type) {
        return _data[type];
      };

      var add = function (type, object) {
        return dataRef(type).$push(object);
      };

      var remove = function (type, object) {
        _promise[type].$remove(object);
      };

      var update = function (type, object) {
        return _promise[type].$save(object);
      };

      return {
        promiseToHaveAll: promiseToHaveAll,
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