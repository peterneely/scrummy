'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Init', InitService);

  InitService.inject = ['$q', 'Data', 'Auth', 'User', 'State'];

  function InitService($q, Data, Auth, User, State) {

    return {
      getCoreData: getCoreData
    };

    function getCoreData() {
      var deferred = $q.defer();
      getUser().then(function (user) {
        $q.all(getData(user)).then(function (data) {
          deferred.resolve(viewData(user, data));
        });
      });
      return deferred.promise;

      function getUser() {
        var deferred = $q.defer();
        Auth.getAuthUser().then(function (authUser) {
          if (authUser) {
            console.log(authUser);
            User.get(authUser).then(function (user) {
              console.log(user);
              deferred.resolve(user);
            });
          } else {
            State.go('login');
          }
        });
        return deferred.promise;
      }

      function getData(user) {
        var promises = [];
        ['clients', 'projects', 'tasks', 'times'].forEach(function (type) {
          promises.push(Data.getData(user, type));
        });
        return promises;
      }

      function viewData(user, data) {
        return {
          user: user,
          clients: data[0],
          projects: data[1],
          tasks: data[2],
          times: data[3]
        };
      }
    }
  }

})();