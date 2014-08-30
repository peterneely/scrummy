'use strict';

(function () {

  var cacheService = function() {

    return {
      cached: [],
      data: {
        user: null,
        clients: null,
        projects: null,
        tasks: null
      },
      resources: {
        clients: null,
        projects: null,
        tasks: null
      }
    };
  };

  angular
    .module('scrummyApp')
    .factory('Cache', cacheService);
})();