'use strict';

(function () {

  var dataService = ['$firebase', 'URL', 'User',
    function ($firebase, URL, User) {

      var data, list;

      var all = function (dataType) {
        data = getData(dataType);
        list = data.$asArray();
        return list;
      };

      var add = function (object) {
        return data.$push(object);
      };

      var remove = function (object) {
        list.$remove(object);
      };

      var update = function (object) {
        return list.$save(object);
      };

      function getData(dataType){
        var currentUser = User.getCurrentUser();
        var dataLocation = '/' + dataType;
        var url = URL.firebase + currentUser.id + dataLocation;
        return $firebase(new Firebase(url));
      }

      return {
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