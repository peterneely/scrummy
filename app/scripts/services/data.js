'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Data', DataService);

  DataService.$inject = ['$firebase', 'Config', 'Log'];

  function DataService($firebase, Config, Log) {

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
      var url = Config.urlData + '/users/' + user.id + '/' + type;
      return resource(url);
    }

    function remove(item, items) {
      items.$remove(item);
    }

    function startTimer(state) {
      Log.info(state);
    }

    function update(item, items) {
      return items.$save(item);
    }

    function userResource(userName) {
      var url = Config.urlData + '/users/' + userName + '/account';
      return resource(url);
    }

    function resource(url) {
      return $firebase(new Firebase(url));
    }
  }

})();