'use strict';

(function () {

  var initService = ['$q', 'Data', 'Auth', 'Account', 'Location', 'TYPE',
    function ($q, Data, Auth, Account, Location, TYPE) {

      var _data = {
        data: {
          user: {},
          clients: [],
          projects: [],
          tasks: []
        },
        resources: {
          clients: {},
          projects: {},
          tasks: {}
        }
      };

      var data = function () {
        var deferred = $q.defer();
        getUser().then(function (user) {
          getData(user).then(function (data) {
            console.log(data, _data);
            deferred.resolve(data);
          });
        });
        return deferred.promise;
      };

      function getUser() {
        var deferred = $q.defer();
        Auth.getAuthenticatedUser().then(function (authUser) {
          if (authUser) {
            Account.getAccountUser(authUser).then(function (user) {
              _data.data.user = user;
              deferred.resolve(user);
            });
          } else {
            Location.go('login');
          }
        });
        return deferred.promise;
      }

      function getData(user) {
        var deferred = $q.defer();
        var types = [TYPE.clients, TYPE.projects, TYPE.tasks];
        angular.forEach(types, function (type) {
          var resource = Data.getResource(user, type);
          Data.load(resource).then(function (data) {
            _data.data[type] = data;
            _data.resources[type] = resource;
            deferred.resolve(_data);
          });
        });
        return deferred.promise;
      }

      return {
        data: data
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Init', initService);
})();