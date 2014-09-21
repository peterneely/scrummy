'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Async', AsyncService);

  AsyncService.$inject = ['$q'];

  function AsyncService($q) {
    return {
      all: all,
      promise: promise,
      when: when
    };

    function all(promises){
      return $q.all(promises);
    }

    function promise(callback) {
      var deferred = $q.defer();
      callback(deferred);
      return deferred.promise;
    }

    function when(value){
      return $q.when(value);
    }
  }
})();