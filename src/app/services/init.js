'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Init', InitService);

  InitService.inject = ['$q', 'Resource', 'Auth', 'User', 'State'];

  function InitService($q, Resource, Auth, User, State) {

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
          State.go('login');
        }
      }

      function getData(user) {
        _user = user;
        var promises = [];
        ['clients', 'projects', 'tasks', 'times'].forEach(function (type) {
          promises.push(Resource.getAll([type]));
        });
        return $q.all(promises);
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