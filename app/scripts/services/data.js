'use strict';

(function () {

  var dataService = ['$firebase', 'URL', 'User',
    function ($firebase, URL, User) {

      var dataLocation = null;

      var is = function(dataType){
        dataLocation = '/' + dataType;
      };

      var all = function(){
        return data().$asObject();
      };

      var add = function (object) {
        return data().$push(object);
      };

      var remove = function (id) {
        return data().$remove(id);
      };

      var update = function (id, object) {
        return data().$update(id, object);
      };

      function data() {
        var currentUser = User.getCurrentUser();
        var url = URL.firebase + currentUser.id + dataLocation;
        return $firebase(new Firebase(url));
      }

      return {
        is: is,
        all: all,
        add: add,
        remove: remove,
        update: update
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Data', dataService);
})();