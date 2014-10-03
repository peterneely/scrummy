'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Url', UrlService);

  UrlService.$inject = ['Config'];

  function UrlService(Config) {

    var _userName = null;

    return {
      cacheUserName: cacheUserName,
      clients: clients,
      isUserNameCached: isUserNameCached,
      projects: projects,
      tasks: tasks,
      time: time,
      timeEntry: timeEntry,
      times: times,
      timeType: timeType,
      user: user,
      userPic: userPic,
      userStateAdmin: userStateAdmin,
      userStateTime: userStateTime,
      userStateTimeType: userStateTimeType
    };

    function cacheUserName(userName) {
      _userName = userName;
    }

    function clients() {
      return url(['clients']);
    }

    function isUserNameCached() {
      return _userName !== null;
    }

    function projects() {
      return url(['projects']);
    }

    function tasks() {
      return url(['tasks']);
    }

    function time(id) {
      return url(['times', id, 'time']);
    }

    function timeEntry(id) {
      return url(['times', id]);
    }

    function times() {
      return url(['times']);
    }

    function timeType(timeId, type) {
      return url(['times', timeId, type]);
    }

    function url(fragments) {
      return Config.urlData + _userName + '/' + fragments.join('/');
    }

    function user() {
      return url(['user']);
    }

    function userPic(hash) {
      return Config.urlPic + hash + '?d=mm';
    }

    function userStateAdmin(){
      return url(['user', 'state', 'admin']);
    }

    function userStateTime() {
      return url(['user', 'state', 'time']);
    }

    function userStateTimeType(type) {
      return url(['user', 'state', 'time', type]);
    }
  }

})();