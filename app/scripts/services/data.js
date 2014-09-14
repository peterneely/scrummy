'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Data', DataService);

  DataService.$inject = ['$filter', 'Resource'];

  function DataService($filter, Resource) {

    return {
      add: add,
      createUser: createUser,
      getData: getData,
      getUser: getUser,
      remove: remove,
      startTimer: startTimer,
      update: update,
      watch: watch
    };

    function add(item, user, type) {
      return Resource.data(user.userName, type).$push(item);
    }

    function createUser(authUser) {
      var user = $filter('userFromAuthUser')(authUser);
      return Resource.data(user.userName, 'user').$set(user);
    }

    function getData(user, type) {
      return Resource.data(user.userName, type).$asArray().$loaded();
    }

    function getUser(authUser) {
      var userName = $filter('userName')(authUser.email);
      return Resource.data(userName, 'user').$asObject().$loaded();
    }

    function remove(item, viewData) {
      viewData.items.$remove(item);
    }

    function startTimer(viewData, timeEntry) {
      var userName = viewData.user.userName;
      console.log(timeEntry);
      return Resource.data(userName, 'times').$push(timeEntry);
    }

    function update(item, viewData) {
      return viewData.items.$save(item).then(updateTypeTimes);

      function updateTypeTimes() {
        getData(viewData.user, 'times').then(function (times) {
          var type = $filter('singular')(viewData.type);
          var typeTimes = _.where(times, function (time) {
            return time[type].id === item.$id;
          });
          typeTimes.forEach(function (typeTime) {
            var urlParts = {
              userName: viewData.user.userName,
              type: type,
              timeId: typeTime.$id
            };
            Resource.time(urlParts).$update({text: item.name});
          });
        });
      }
    }

    function watch(data, callback) {
      data.$watch(function () {
        callback();
      });
    }
  }

})();