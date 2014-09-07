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

    function remove(item, viewData) {
      viewData.items.$remove(item);
    }

    function resource(url) {
      return $firebase(new Firebase(url));
    }

    function startTimer(user, timeEntry) {
      return dataResource(user, 'times').$push(timeEntry);
    }

    function update(item, viewData) {
      return viewData.items.$save(item);
    }

    function userResource(userName) {
      var url = $filter('urlData')(userName, 'account');
      return resource(url);
    }
  }

})();