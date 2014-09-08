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
      return Resource.data(user, type).$push(item);
    }

    function createUser(authUser) {
      var user = $filter('userFromAuthUser')(authUser);
      return Resource.user(user.userName).$set(user);
    }

    function getData(user, type) {
      return Resource.data(user, type).$asArray().$loaded();
    }

    function getUser(authUser) {
      var userName = $filter('userName')(authUser.email);
      return Resource.user(userName).$asObject().$loaded();
    }

    function remove(item, viewData) {
      viewData.items.$remove(item);
    }

    function startTimer(viewData, timeEntry) {
      var user = viewData.user;
      return Resource.data(user, 'times').$push(timeEntry).then(updateRelatedTypes);

      function updateRelatedTypes(ref) {
        var itemId = ref.name();
        ['client', 'project', 'task'].forEach(function (type) {
          var relatedType = $filter('plural')(type);
          var relatedItemId = timeEntry[type].id;
          var resource = Resource.related(user, relatedType, relatedItemId, 'times');
          resource.$push(itemId);
        });
      }
    }

    function update(item, viewData) {
      return viewData.items.$save(item).then(updateRelatedTimes);

      function updateRelatedTimes() {
        var type = $filter('singular')(viewData.type);
        angular.forEach(item.times, function (time) {
          var relatedTime = viewData.times.$getRecord(time);
          relatedTime[type].text = item.name;
          viewData.times.$save(relatedTime);
        });
      }
    }
  }

})();