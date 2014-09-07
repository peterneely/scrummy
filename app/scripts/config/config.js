'use strict';

(function () {

  angular
    .module('scrummyApp')
    .constant('Config', config());

  function config() {
    return {
      loggingEnabled: true,

      urlAuth: 'https://scrummy.firebaseio.com',
      urlData: 'https://scrummy.firebaseio.com/users/',
      urlPic: 'http://www.gravatar.com/avatar'
    };
  }

})();