'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'Auth', 'Account', 'Location', 'URL',
    function ($q, $firebase, Auth, Account, Location, URL) {

      var _coreData = {
        user: null,
        clients: {
          store: null,
          array: [],
          resolved: []
        },
        projects: {
          store: null,
          array: [],
          resolved: []
        },
        tasks: {
          store: null,
          array: [],
          resolved: []
        }
      };

      var getInitial = function () {

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

      var get = function(type){
        return _coreData[type].resolved;
      };

      var add = function(type, object){
        return _coreData[type].store.$push(object);
      };

      var update = function(type, object){
        return _coreData[type].array.$save(object);
      };

      var remove = function(type, object){
        _coreData[type].array.$remove(object);
      };

      return {
        getInitial: getInitial,
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