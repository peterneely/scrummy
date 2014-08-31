'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'State', 'Url',
    function ($q, $firebase, State, Url) {

      var coreData = {
        user: {},
        clients: [],
        projects: [],
        tasks: []
      };

      var dataResource = function (user, type) {
        var url = Url.data(user.id, type);
        return $firebase(new Firebase(url));
      };

      var userResource = function (userName) {
        var url = Url.user(userName);
        return $firebase(new Firebase(url));
      };

      function resource() {
        var user = coreData.user;
        var type = State.dataType();
        var url = Url.resource(user, type);
        return $firebase(new Firebase(url));
      }

      var get = function (type) {
        return coreData[type];
      };

      var add = function (object) {
        return resource().$push(object);
      };

      var update = function (object) {
        return data().$save(object);
      };

      var remove = function (object) {
        data().$remove(object);
      };

      function data() {
        return coreData[State.dataType()];
      }

      return {
        coreData: coreData,
        dataResource: dataResource,
        userResource: userResource,
        get: get,
        add: add,
        update: update,
        remove: remove
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Data', dataService);
})();