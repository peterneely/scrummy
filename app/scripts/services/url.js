'use strict';

(function(){

  var urlService = function(){

    var data = 'https://scrummy.firebaseio.com';

    var avatar = 'http://www.gravatar.com/avatar';

    return {
      data: data,
      avatar: avatar
    }
  };

  angular
    .module('scrummyApp')
    .factory('Url', urlService);
})();