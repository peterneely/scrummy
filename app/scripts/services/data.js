'use strict';

(function () {

  var dataService = ['$firebase', 'Cache', function ($firebase, Cache) {

    var get = function (type) {
      return data(type);
    };

    var add = function (type, object) {
      return store(type).$push(object);
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

    function store(type) {
      return Cache.getStore(type);
    }

    return {
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