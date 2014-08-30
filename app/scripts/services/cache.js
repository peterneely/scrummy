'use strict';

(function () {

  var cacheService = ['TYPE', function (TYPE) {

    var _coreData = {
      cached: [],
      data: {
        user: null,
        clients: [],
        projects: [],
        tasks: []
      },
      resources: {
        clients: [],
        projects: [],
        tasks: []
      }
    };

    var getTypes = function (types) {
      var result = {
        data: {
          user: null,
          clients: [],
          projects: [],
          tasks: []
        },
        resources: {
          clients: [],
          projects: [],
          tasks: []
        }
      };
      angular.forEach(types, function (type) {
        result.data[type] = getData(type);
        result.resources[type] = getResource(type);
      });
      return result;
    };

    var getData = function (type) {
      return _coreData.data[type];
    };

    var getResource = function (type) {
      return _coreData.resources[type];
    };

    var isCached = function (type) {
      return _.contains(_coreData.cached, type);
    };

    var cache = function (data) {
      cacheUser(data);
      cacheData(data);
    };

    function cacheUser(data){
      if (!isCached(TYPE.user)) {
        _coreData.data.user = data.data.user;
        _coreData.cached.push(TYPE.user);
      }
    }

    function cacheData(data){
      console.log(data, data.data.clients.length);
      angular.forEach(data.cached, function(type){
        console.log(type);
        _coreData.data[type] = data.data[type];
        _coreData.resources[type] = data.resources[type];
        _coreData.cached.push(type);

      });
    }

    return {
      getTypes: getTypes,
      getData: getData,
      getResource: getResource,
      isCached: isCached,
      cache: cache
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Cache', cacheService);
})();