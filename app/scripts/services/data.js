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

      tagTimeEntryForSorting();
      saveTimeEntry().then(updateTypeTimes);

      function saveTimeEntry() {
        return Resource.data(userName, 'times').$push(timeEntry);
      }

      function tagTimeEntryForSorting() {
        timeEntry['.priority'] = $filter('isoWeek')(timeEntry.time.date);
      }

      function updateTypeTimes(ref) {
        var timeId = ref.name();
        ['client', 'project', 'task'].forEach(function (type) {
          var urlParts = {
            userName: userName,
            type: type,
            typeId: timeEntry[type].id
          };
          Resource.typeTimes(urlParts).$push(timeId);
        });
      }
    }

    function update(item, viewData) {
      return viewData.items.$save(item).then(updateTypeTimes);

      function updateTypeTimes() {
        var type = $filter('singular')(viewData.type);
        var userName = viewData.user.userName;
        var urlParts = {
          userName: userName,
          type: type,
          typeId: item.$id
        };
        Resource.typeTimes(urlParts).$asArray().$loaded().then(function(typeTimes){
          Resource.data(userName, 'times').$asArray().$loaded().then(function(times){
            angular.forEach(typeTimes, function (typeTime) {
              var time = times.$getRecord(typeTime.$value);
              if (time) {
                time[type].text = item.name;
                times.$save(time);
              }
            });
          });
        });
      }
    }
  }

})();