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
      nest: nest,
      remove: remove,
      savePreferences: savePreferences,
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

    function nest(seq, keys) {
      if (!keys.length) {
        return seq;
      }
      var first = keys[0];
      var rest = keys.slice(1);
      return _.mapValues(_.groupBy(seq, first), function (value) {
        return nest(value, rest);
      });
    }

    function remove(item, viewData) {
      viewData.items.$remove(item);
    }

    function savePreferences(prefs, user, type){
      Resource.preferences(user.userName, type).$set(prefs);
    }

    function startTimer(viewData, timeEntry) {
      var userName = viewData.user.userName;
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