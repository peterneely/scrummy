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

      dateTimeFormat: 'YYYY-MM-DD HH:mm',
      dateFormat: 'YYYY-MM-DD',
      dayTitleFormat: 'ddd, DD MMM YYYY',
      timeFormat: 'HH:mm'
    };
  }

})();