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

    var getAll = function () {
      return coreData;
    };

    var getData = function (type) {
      return coreData.data[type];
    };

    var getStore = function (type) {
      return coreData.store[type];
    };

    var isCached = function (type) {
      return _.contains(coreData.cached, type);
    };

    var cacheData = function (data) {
      data[key] = value;
    };

    return {
      getAll: getAll,
      getData: getData,
      getStore: getStore,
      isCached: isCached,
      cacheData: cacheData
    };
  };

  angular
    .module('scrummyApp')
    .factory('Cache', cacheService);
})();