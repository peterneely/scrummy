'use strict';

(function () {

  var dataService = ['$firebase', 'URL', function ($firebase, URL) {

    var getResource = function(user, type){
      var url = URL.firebase + 'users/' + user.id + '/' + type;
      return $firebase(new Firebase(url));
    };

    var load = function(resource){
      return resource.$asArray().$loaded();
    };

    var get = function (type) {
      return data(type);
    };

    var add = function (type, object) {
      return resource(type).$push(object);
    };

    var update = function (type, object) {
      return data(type).$save(object);
    };

    var remove = function (type, object) {
      data(type).$remove(object);
    };

    return {
      load: load,
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