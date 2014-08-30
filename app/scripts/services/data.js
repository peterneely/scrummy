'use strict';

(function () {

  var dataService = ['$firebase', 'Cache', 'URL', function ($firebase, Cache, URL) {

    var getResource = function(user, type){
      var url = URL.store + user.id + '/' + type;
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

    function data(type) {
      return Cache.getData(type);
    }

    function resource(type) {
      return Cache.getResource(type);
    }

    return {
      getResource: getResource,
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