'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config'];

  function ResourceService($firebase, Config) {

    return {
      data: data,
      time: time
    };

    function data(userName, type) {
      console.log(url(userName, type));
      return resource(url(userName, type));
    }

    function resource(url) {
      return $firebase(sdkResource(url));
    }

    function sdkResource(url) {
      return new Firebase(url);
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