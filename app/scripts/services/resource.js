'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config'];

  function ResourceService($firebase, Config) {

    return {
      data: data,
      time: time,
      typeTimes: typeTimes
    };

    function data(userName, type) {
      return resource(url(userName, type));
    }

    function time(urlParts) {
      var location = 'times/' + urlParts.timeId + '/' + urlParts.type;
      return resource(url(urlParts.userName, location));
    }

    function typeTimes(urlParts){
      var location = urlParts.type + 'times/' + urlParts.typeId;
      var locationUrl = url(urlParts.userName, location);
      return resource(locationUrl);
    }

    function resource(url) {
      return $firebase(new Firebase(url));
    }

    function url(userName, location){
      var locationUrl = Config.urlData + userName + '/' + location;
      return locationUrl.replace('undefined', '');
    }
  }

})();