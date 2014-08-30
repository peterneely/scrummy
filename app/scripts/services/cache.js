'use strict';

(function () {

  var cacheService = function () {

    var coreData = {
      cached: [],
      data: {
        user: null,
        clients: null,
        projects: null,
        tasks: null
      },
      store: {
        clients: null,
        projects: null,
        tasks: null
      }
    };

    var getData = function () {
      return coreData;
    };

    var isCached = function (type) {
      return _.contains(coreData.cached, type);
    };

    var cacheData = function (data) {
      data[key] = value;
    };

    return {
      getData: getData,
      isCached: isCached,
      cacheData: cacheData
    };
  };

  angular
    .module('scrummyApp')
    .factory('Cache', cacheService);
})();