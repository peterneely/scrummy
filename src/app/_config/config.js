'use strict';

(function () {

  angular
    .module('scrummyApp')
    .constant('Config', config());

  function config() {
    return {
      urlAuth: 'https://scrummy.firebaseio.com/',
      urlData: 'https://scrummy.firebaseio.com/users/',
      urlPic: 'http://www.gravatar.com/avatar/',

      dateTimeFormat: 'yyyy-MM-dd HH:mm',
      dateFormat: 'yyyy-MM-dd',
      timeFormat: 'HH:mm'
    };
  }

})();