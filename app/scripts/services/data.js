'use strict';

(function () {

  var dataService = ['Cache', function (Cache) {

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
      return Cache.getData().data[type];
    }

    function store(type) {
      return Cache.getData().store[type];
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