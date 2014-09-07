'use strict';

(function(){

  angular
    .module('scrummyApp')
    .value('Config', config());

  function config(){
    return {
      loggingEnabled: true
    };
  }

})();