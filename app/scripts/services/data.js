'use strict';

(function () {

  var dataService = ['$q', '$firebase', '$state', 'URL', 'User',
    function ($q, $firebase, $state, URL, User) {

      var data, list;

      var allCurrent = function () {
        var dataUrl = '/' + $state.current.name;
        return all(dataUrl);
      };

      var all = function(dataUrl){
        data = getData('/' +dataUrl);
        list = data.$asObject();
        return list;
      };

      function getData(dataUrl){
        var currentUser = User.getCurrentUser();
        var url = URL.firebase + currentUser.id + dataUrl;
        return $firebase(new Firebase(url));
      }

      var add = function (object) {
        return data.$push(object);
      };

      var remove = function (object) {
        list.$remove(object);
      };

      var update = function (object) {
        return list.$save(object);
      };

      return {
        allCurrent: allCurrent,
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