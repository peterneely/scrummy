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

    function add(item, user, type) {
      var sortedItem = sorted(item, item.name);
      console.log(sortedItem);
      return Resource.data(user.userName, type).$push(sortedItem);
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

    function sorted(item, value, isNewItem) {
      isNewItem = isNewItem === undefined ? true : isNewItem;
      if (isNewItem) {
        item['.priority'] = value;
      } else {
        item.$priority = value;
      }
      return item;
    }

    function startTimer(viewData, timeEntry) {
      var userName = viewData.user.userName;
      var sortOrder = $filter('isoWeek')(timeEntry.time.date);
      saveTimeEntry().then(updateTypeTimes);

      function saveTimeEntry() {
        var sortedTimeEntry = sorted(timeEntry, sortOrder);
        return Resource.data(userName, 'times').$push(sortedTimeEntry);
      }

      function updateTypeTimes(ref) {
        var timeId = ref.name();
        ['client', 'project', 'task'].forEach(function (type) {
          var sortedTypeTime = sorted({timeId: timeId}, sortOrder);
          Resource.typeTimes(urlParts(type)).$push(sortedTypeTime);
        });

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
      var isNewItem = false;
      var sortedItem = sorted(item, item.name, isNewItem);
      return viewData.items.$save(sortedItem).then(updateTypeTimes);

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