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
      user: user
    };

    function cacheUserName(userName) {
      _userName = userName;
    }

    function root(url){
      return Config.urlData + _userName + url;
    }

    function user(){
      return root('/user');
    }
  }
})();