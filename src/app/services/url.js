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
      path: path
    };

    function cacheUserName(userName) {
      _userName = userName;
    }

    function path(fragments){
      return root('/' + fragments.join('/'));
    }

    function root(url){
      return Config.urlData + _userName + url;
    }
  }
})();