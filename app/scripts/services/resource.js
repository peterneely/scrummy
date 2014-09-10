'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config'];

  function ResourceService($firebase, Config) {

    return {
      data: data
    };

    function data(userName, type) {
      var url = Config.urlData + userName + locationFor(type);
      return resource(url);
    }

    function locationFor(type) {
      var map = {
        clients: '/clients',
        clientTimes: '/clienttimes',
        projects: '/projects',
        projectTimes: '/projecttimes',
        tasks: '/tasks',
        taskTimes: '/tasktimes',
        times: '/times',
        user: '/user'
      };
      return map[type];
    }

    function resource(url) {
      return $firebase(new Firebase(url));
    }
  }

})();