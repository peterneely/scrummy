'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Data', DataService);

  DataService.$inject = ['$filter', 'Config', 'Resource'];

  function DataService($filter, Config, Resource) {

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
      /*jshint camelcase: false */

      var email = authUser.email;
      var userName = getUserName(email);
      var user = {
        userName: userName,
        email: email,
        pic: Config.urlPic + authUser.md5_hash + '?d=mm'
      };
      return Resource.user(userName).$set(user);
    }

    function getData(user, type) {
      return Resource.data(user, type).$asArray().$loaded();
    }

    function getUser(authUser) {
      Resource.user(getUserName(authUser.email)).$asObject().$loaded().then(mapUser);

      function mapUser(user) {
        console.log(user);
        return {
          userName: user.userName,
          email: user.email,
          pic: user.pic
        };
      }
    }

    function remove(item, viewData) {
      viewData.items.$remove(item);
    }

    function startTimer(viewData, timeEntry) {
      var user = viewData.user;
      return Resource.data(user, 'times').$push(timeEntry).then(updateRelated);

      function updateRelated(ref) {
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
      return viewData.items.$save(item);
    }

    function getUserName(email) {
      return $filter('userName')(email);
    }
  }

})();