'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Data', DataService);

  DataService.$inject = ['$firebase', '$filter'];

  function DataService($firebase, $filter) {

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
      return dataResource(user, type).$push(item);
    }

    function createUser(authUser) {
      /*jshint camelcase: false */

      var email = authUser.email;
      var userName = getUserName(email);
      var user = {
        userName: userName,
        email: email,
        pic: $filter('urlPic')(authUser.md5_hash)
      };
      return userResource(userName).$set(user);
    }

    function dataResource(user, type) {
      var url = $filter('urlData')(user.userName, type);
      return resource(url);
    }

    function getData(user, type) {
      return dataResource(user, type).$asArray().$loaded();
    }

    function getUser(authUser) {
      return userResource(getUserName(authUser.email)).$asObject().$loaded();
    }

    function remove(item, viewData) {
      viewData.items.$remove(item);
    }

    function resource(url) {
      return $firebase(new Firebase(url));
    }

    function startTimer(viewData, timeEntry) {
      return dataResource(viewData.user, 'times').$push(timeEntry).then(updateRelated);

      function updateRelated(newTimeEntry) {
        console.log(newTimeEntry);
      }
    }

    function update(item, viewData) {
      return viewData.items.$save(item);
    }

    function getUserName(email) {
      return $filter('userName')(email);
    }

    function userResource(userName) {
      var url = $filter('urlData')(userName, 'user');
      return resource(url);
    }
  }

})();