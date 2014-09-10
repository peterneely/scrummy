'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config'];

  function ResourceService($firebase, Config) {

    return {
      data: data,
      dataForLocation: dataForLocation
    };

    function data(userName, type) {
      return resource(url(userName, locationFor(type)));
    }

    function dataForLocation(userName, location){
      console.log(url(userName + location));
      return resource(url(userName + location));
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