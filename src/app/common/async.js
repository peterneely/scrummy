'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Async', AsyncService);

  function AsyncService() {

    return {
      task: task
    };

    function task(callback) {
      var deferred = $q.defer();
      callback(deferred);
      return deferred.promise;
    }
  }
})();