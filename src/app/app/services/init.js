'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Init', InitService);

  InitService.inject = ['Async', 'Resource', 'State', 'Url', 'User'];

  function InitService(Async, Resource, State, Url, User) {

    return {
      getCoreData: getCoreData
    };

    function getCoreData() {
      var _user = {};
      return User.getAuthUser()
        .then(cacheUserName)
        .then(getUser)
        .then(getData)
        .then(mapData);

      function cacheUserName(authUser){
        return User.cacheUserName(authUser);
      }

      function getUser(authUser) {
        if (authUser) {
          return User.get(authUser);
        } else {
          Async.promise(login);
        }

        function login(deferred){
          State.go('login');
          deferred.reject();
        }
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