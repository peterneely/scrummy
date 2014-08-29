'use strict';

(function () {

  var cacheService = function () {

      var coreData = {
        loaded: [],
        data: {
          user: null,
          clients: {
            store: null,
            data: []
          },
          projects: {
            store: null,
            data: []
          },
          tasks: {
            store: null,
            data: []
          }
        }
      };

      var getCoreData = function(){
        return coreData;
      };

      var setCoreData = function(data){
        data[key] = value;
      };

      return {
        getCoreData: getCoreData,
        setCoreData: setCoreData
      };
    };

  angular
    .module('scrummyApp')
    .factory('Cache', cacheService);
})();