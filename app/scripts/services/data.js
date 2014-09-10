'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Data', DataService);

  DataService.$inject = ['$filter', '$moment', 'Resource'];

  function DataService($filter, $moment, Resource) {

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
      var date = $moment(timeEntry.time.date);
      timeEntry['.priority'] = date.year() + '_' + $filter('doubleDigits')(date.isoWeek());
      var user = viewData.user;
      var times = Resource.data(user.userName, 'times');
      return times.$push(timeEntry).then(updateRelatedTypes);

      function updateRelatedTypes(ref) {
        var itemId = ref.name();
        ['client', 'project', 'task'].forEach(function (type) {
          var relatedType = $filter('plural')(type);
          var relatedItemId = timeEntry[type].id;
          var resource = Resource.related(user, relatedType, relatedItemId, 'times');
          resource.$push({id: itemId, parent: key});
        });
      }
    }

    function update(item, viewData) {
      return viewData.items.$save(item).then(updateRelatedTimes);

      function updateRelatedTimes() {
        var type = $filter('singular')(viewData.type);
        angular.forEach(item.times, function (time) {
          var parent = viewData.times.$getRecord(time.parent);
          parent[time.id][type].text = item.name;
          viewData.times.$save(parent);
        });
      }
    }
  }

})();