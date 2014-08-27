'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'URL', 'User',
    function ($q, $firebase, URL, User) {

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
        var types = ['clients', 'projects', 'tasks'];
        angular.forEach(types, function (type) {
          coreDataFor(type, deferred);
        });
        return deferred.promise;
      };

      function coreDataFor(type, deferred){
        if (_data[type] === null) {
          var array = _promise[type] = dataArray(type);
          array.$loaded().then(function (data) {
            deferred.resolve(_data[type] = data);
          });
        } else {
          deferred.resolve(_data[type]);
        }
      }

      function dataArray(type) {
        return data(type).$asArray();
      }

      function data(type){
        var currentUser = User.getCurrentUser();
        var url = URL.firebase + currentUser.id + '/' + type;
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