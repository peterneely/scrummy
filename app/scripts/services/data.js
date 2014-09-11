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
      update: update
    };

    function add(item, user, location) {
      return Resource.data(user.userName, location).$push(item);
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
      var sortOrderTag = $filter('isoWeek')(timeEntry.time.date);
      saveTimeEntry().then(updateTypeTimes);

      function saveTimeEntry() {
        timeEntry['.priority'] = sortOrderTag;
        return Resource.data(userName, 'times').$push(timeEntry);
      }

      function updateTypeTimes(ref) {
        var timeId = ref.name();
        ['client', 'project', 'task'].forEach(function (type) {
          Resource.typeTimes(urlParts(type)).$push(taggedTypeTime());
        });

        function taggedTypeTime() {
          var item = {timeId: timeId};
          item['.priority'] = sortOrderTag;
          return item;
        }

        function urlParts(type) {
          return {
            userName: userName,
            type: type,
            typeId: timeEntry[type].id
          };
        }
      }
    }

    function update(item, viewData) {
      return viewData.items.$save(item).then(updateTypeTimes);

      function updateTypeTimes() {
        var urlParts = getUrlParts();
        Resource.typeTimes(urlParts).$asArray().$loaded().then(function (typeTimes) {
          angular.forEach(typeTimes, function (typeTime) {
            urlParts.timeId = typeTime.timeId;
            var time = Resource.time(urlParts);
            if (time) {
              time.$update({text: item.name});
            }
          });
        });

        function getUrlParts() {
          return {
            userName: viewData.user.userName,
            type: $filter('singular')(viewData.type),
            typeId: item.$id
          };
        }
      }
    }
  }

})();