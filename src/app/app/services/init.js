'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Init', InitService);

  InitService.inject = ['Async', 'Resource', 'Url', 'User'];

  function InitService(Async, Resource, Url, User) {

    return {
      getCoreData: getCoreData
    };

    function getCoreData() {
      var _user = {};
      return User.getAuthUser()
        .then(getAuthStatus)
        .then(cacheUserName)
        .then(getUser)
        .then(getData)
        .then(mapData);

      function getAuthStatus(authUser) {
        return User.getAuthStatus(authUser);
      }

      function cacheUserName(authUser) {
        return User.cacheUserName(authUser);
      }

      function getUser(authUser) {
        return User.get(authUser);
      }

      function getData(user) {
        _user = user;
        var promises = [];
        ['clients', 'projects', 'tasks', 'times'].forEach(function (type) {
          promises.push(Resource.getAll(Url[type]()));
        });
        return Async.all(promises);
      }

      function mapData(data) {
        return {
          user: _user,
          clients: data[0],
          projects: data[1],
          tasks: data[2],
          times: data[3]
        };
      }
    }
  }

})();