'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Url', UrlService);

  function UrlService() {

    var _userName = null;

    return {
      root: root,
      user: 'users/' + _userName + '/user'
    };

    function root(userName) {
      _userName = userName;
    }
  }
})();