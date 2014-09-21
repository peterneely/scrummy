'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Init', InitService);

  InitService.inject = ['Resource', 'Auth', 'User', 'State', 'Async'];

  function InitService(Resource, Auth, User, State, Async) {

    return {
      getCoreData: getCoreData
    };

    function getCoreData() {
      var _user = {};
      return Auth.getAuthUser()
        .then(getUser)
        .then(getData)
        .then(mapData);

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
          promises.push(Resource.getAll([type]));
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