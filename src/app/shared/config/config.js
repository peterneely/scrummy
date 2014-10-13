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

      minPasswordLength: 6,

      dateFormat: 'YYYY-MM-DD',
      dateTimeFormat: 'YYYY-MM-DD HH:mm',
      dateTimeSecondsFormat: 'YYYY-MM-DD HH:mm:ss',
      dayTitleFormat: 'ddd, DD MMM YYYY',
      seconds: 's',
      timeFormat: 'HH:mm'
    };
  }

})();
