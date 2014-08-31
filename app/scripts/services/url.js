'use strict';

(function () {

  var urlService = function () {

    var rootData = 'https://scrummy.firebaseio.com';

    var rootAvatar = 'http://www.gravatar.com/avatar';

    var data = function (userName, type) {
      return rootData + '/users/' + userName + '/' + type;
    };

    var user = function(userName){
      return rootData + '/users/' + userName + '/account';
    };

    return {
      rootData: rootData,
      rootAvatar: rootAvatar,
      data: data,
      user: user
    };
  };

  angular
    .module('scrummyApp')
    .factory('Url', urlService);
})();