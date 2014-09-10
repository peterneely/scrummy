'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config'];

  function ResourceService($firebase, Config) {

    return {
      data: data,
      typeTimes: typeTimes
    };

    function data(userName, type) {
      return resource(url(userName, locationFor(type)));
    }

    function typeTimes(urlParts){
      var location = '/' + urlParts.type + 'times/' + urlParts.typeId;
      var locationUrl = url(urlParts.userName, location);
      return resource(locationUrl.replace('undefined', ''));
    }

    function locationFor(type) {
      var map = {
        clients: '/clients',
        clienttimes: '/clienttimes',
        projects: '/projects',
        projecttimes: '/projecttimes',
        tasks: '/tasks',
        tasktimes: '/tasktimes',
        times: '/times',
        user: '/user'
      };
      return map[type];
    }

    function resource(url) {
      return $firebase(new Firebase(url));
    }

    function url(userName, location){
      return Config.urlData + userName + location;
    }
  }

})();