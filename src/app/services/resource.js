'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config', 'Url'];

  function ResourceService($firebase, Config, Url) {

    return {
      getAll: getAll,
      get: get,
      put: put,

      data: data,
      state: state,
      time: time
    };

    function getAll(urlFragments){
      return ref(urlFragments).$asArray().$loaded();
    }

    function get(urlFragments){
      return ref(urlFragments).$asObject().$loaded();
    }

    function put(urlFragments, data){
      return ref(urlFragments).$set(data);
    }

    function ref(urlFragments){
      return resource(Url.path(urlFragments))
    }

    function resource(url) {
      return $firebase(sdkResource(url));
    }

    function sdkResource(url) {
      return new Firebase(url);
    }






    function data(userName, type) {
      return resource(url(userName, type));
    }

    function state(userName, type){
      return resource(url(userName, 'user/state/' + type));
    }



    function time(urlParts) {
      var location = 'times/' + urlParts.timeId + '/' + urlParts.type;
      return resource(url(urlParts.userName, location));
    }

    function url(userName, location) {
      var locationUrl = Config.urlData + userName + '/' + location;
      return locationUrl.replace('undefined', '');
    }
  }

})();