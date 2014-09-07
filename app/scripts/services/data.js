'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Data', DataService);

  DataService.$inject = ['$firebase', '$filter'];

  function DataService($firebase, $filter) {

    return {
      add: add,
      dataResource: dataResource,
      remove: remove,
      startTimer: startTimer,
      update: update,
      userResource: userResource
    };

    function add(item, user, type) {
      return dataResource(user, type).$push(item);
    }

    function dataResource(user, type) {
      var url = $filter('urlData')(user.id, type);
      return resource(url);
    }

    function remove(item, items) {
      items.$remove(item);
    }

    function resource(url) {
      return $firebase(new Firebase(url));
    }

    function startTimer(user, state) {
      return timeResource(user).$push(state);
    }

    function timeResource(user){
      var url = $filter('urlData')(user.id, 'times');
      return resource(url);
    }

    function update(item, items) {
      return items.$save(item);
    }

    function userResource(userName) {
      var url = $filter('urlData')(userName, 'account');
      return resource(url);
    }
  }

})();