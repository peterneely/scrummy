'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'Url', function ($q, $firebase, Url) {

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

    function resource(url) {
      return $firebase(new Firebase(url));
    }

    return {
      dataResource: dataResource,
      userResource: userResource,
      add: add,
      update: update,
      remove: remove
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Data', dataService);
})();