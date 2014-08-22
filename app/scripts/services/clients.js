'use strict';

(function () {

  var dataService = ['$firebase', 'URL',
    function ($firebase, URL) {

      var objects = null;

      var init = function (currentUser, objectType) {
        console.log('called');
        var url = URL.firebase + currentUser.id + '/' + objectType;
        objects = $firebase(new Firebase(url));
      };

      var all = objects.$asObject();

      var add = function (object) {
        return objects.$push(object);
      };

      var remove = function (id) {
        return objects.$remove(id);
      };

      var update = function (id, object) {
        return objects.$update(id, object);
      };

      return {
        init: init,
        all: all,
        add: add,
        remove: remove,
        update: update
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Clients', dataService);
})();