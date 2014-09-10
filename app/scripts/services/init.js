'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Init', InitService);

  InitService.inject = ['$q', '$filter', 'Data', 'Auth', 'State'];

  function InitService($q, $filter, Data, Auth, State) {

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
        Auth.getAuthenticatedUser().then(function (authUser) {
          if (authUser) {
            Data.getUser(authUser).then(function (user) {
              deferred.resolve($filter('userFromUser')(user));
            });
          } else {
            State.go('login');
          }
        });
        return deferred.promise;
      }

      function getData(user) {
        var promises = [];
        ['clients', 'projects', 'tasks', 'times', 'clienttimes'].forEach(function (type) {
          promises.push(Data.getData(user, type));
        });
        return promises;
      }

      function viewData(user, data) {
        return {
          user: user,
          clients: data[0],
          clientTimes: data[4],
          projects: data[1],
          tasks: data[2],
          times: data[3]
        };
      }
    }
  }

})();