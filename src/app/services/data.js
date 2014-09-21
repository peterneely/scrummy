'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Data', DataService);

  function DataService() {

    return {
      clients: clients,
      projects: projects,
      tasks: tasks,
      timeType: timeType,
      user: user,
      userStateTimeType: userStateTimeType
    };

    function clients() {
      return ['clients'];
    }

    function projects() {
      return ['projects'];
    }

    function tasks() {
      return ['tasks'];
    }

    function timeType(timeId, type) {
      return ['times', timeId, type, 'text'];
    }

    function user() {
      return ['user'];
    }

    function userStateTimeType(type) {
      return ['user', 'state', 'time', type, 'text'];
    }
  }
})();