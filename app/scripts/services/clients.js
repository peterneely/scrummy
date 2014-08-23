'use strict';

(function () {

  var dataService = ['$firebase', 'URL', 'User',
    function ($firebase, URL, User) {

      function clients() {
        var currentUser = User.getCurrentUser();
        var url = URL.firebase + currentUser.id + '/clients';
        return $firebase(new Firebase(url));
      }

      var all = function(){
        return clients().$asObject();
      };

      var add = function (object) {
        return clients().$push(object);
      };

      var remove = function (id) {
        return clients().$remove(id);
      };

      var update = function (id, object) {
        return clients().$update(id, object);
      };

      return {
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