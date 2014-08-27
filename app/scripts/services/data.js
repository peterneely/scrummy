'use strict';

(function () {

  var dataService = ['$q', '$firebase', '$state', 'URL', 'User',
    function ($q, $firebase, $state, URL, User) {

      var data, list;

      var all = function () {
        var dataUrl = '/' + $state.current.name;
        return allFor(dataUrl);
      };

      var allFor = function(dataUrl){
        data = getData('/' + dataUrl);
        return data.$asArray();
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
        all: all,
        allFor: allFor,
        add: add,
        remove: remove,
        update: update
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Data', dataService);
})();