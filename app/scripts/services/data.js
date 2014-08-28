'use strict';

(function () {

  var dataService = ['CoreData', function (CoreData) {

    var all = function (type) {
      return CoreData.forType(type).resolved;
    };

    var add = function (type, object) {
      return CoreData.forType(type).store.$push(object);
    };

    var remove = function (type, object) {
      CoreData.forType(type).array.$remove(object);
    };

    var update = function (type, object) {
      return CoreData.forType(type).array.$save(object);
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
    .factory('Data', dataService);
})();