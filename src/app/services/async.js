'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Async', AsyncService);

  AsyncService.$inject = ['$q'];

  function AsyncService($q) {
    return {
      promise: promise
    };

    function promise(callback) {
      var deferred = $q.defer();
      callback(deferred);
      return deferred.promise;
    }
  }
})();