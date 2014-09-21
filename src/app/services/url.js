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
      times: times,
      timeType: timeType,
      user: user,
      userPic: userPic,
      userStateTimeType: userStateTimeType
    };

    function cacheUserName(userName) {
      _userName = userName;
    }

    function clients() {
      return url(['clients']);
    }

    function isUserNameCached(){
      return _userName !== null;
    }

    function projects() {
      return url(['projects']);
    }

    function tasks() {
      return url(['tasks']);
    }

    function times(){
      return url(['times']);
    }

    function timeType(timeId, type) {
      return url(['times', timeId, type, 'text']);
    }

    function user() {
      return url(['user']);
    }

    function userPic(hash){
      return Config.urlPic + hash + '?d=mm';
    }

    function url(fragments){
      return Config.urlData + _userName + '/' + fragments.join('/');
    }

    function userStateTimeType(type) {
      return url(['user', 'state', 'time', type, 'text']);
    }
  }
})();