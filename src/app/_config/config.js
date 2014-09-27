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

      dateFormat: 'YYYY-MM-DD',
      dateTimeFormat: 'YYYY-MM-DD HH:mm',
      dateTimeSecondsFormat: 'YYYY-MM-DD HH:mm:ss',
      dayTitleFormat: 'ddd, DD MMM YYYY',
      timeFormat: 'HH:mm'
    };
  }

})();