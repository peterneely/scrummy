'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Init', InitService);

  InitService.inject = ['$q', 'Data', 'Auth', 'User', 'State', 'Async'];

  function InitService($q, Data, Auth, User, State, Async) {

    return {
      getCoreData: getCoreData
    };

    function getCoreData() {
      return Async.promise(coreData);

      function coreData(deferred){
        Async.promise(getUser).then(function (user) {
          $q.all(getData(user)).then(function (data) {
            deferred.resolve(viewData(user, data));
          });
        });
      }

      function getUser(deferred) {
        Auth.getAuthUser().then(function (authUser) {
          if (authUser) {
            User.get(authUser).then(function (user) {
              deferred.resolve(user);
            });
          } else {
            State.go('login');
          }
        });
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