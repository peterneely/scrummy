'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'Url', 'Log', function ($q, $firebase, Url, Log) {

    var dataResource = function (user, type) {
      var url = Url.data(user.id, type);
      return resource(url);
    };

    var userResource = function (userName) {
      var url = Url.user(userName);
      return resource(url);
    };

    var add = function (item, user, type) {
      return dataResource(user, type).$push(item);
    };

    var update = function (item, items) {
      return items.$save(item);
    };

    var remove = function (item, items) {
      items.$remove(item);
    };

    var startTimer = function(state){
      Log.info(state);
    };

    function resource(url) {
      return $firebase(new Firebase(url));
    }

    return {
      dataResource: dataResource,
      userResource: userResource,
      add: add,
      update: update,
      remove: remove,
      startTimer: startTimer
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Data', dataService);
})();