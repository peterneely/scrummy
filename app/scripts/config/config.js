'use strict';

(function(){

  angular
    .module('scrummyApp')
    .constant('Config', config());

  function config(){
    return {
      loggingEnabled: true,

      urlData: 'https://scrummy.firebaseio.com',
      urlPic: 'http://www.gravatar.com/avatar'
    };
  }

})();