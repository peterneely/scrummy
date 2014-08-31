'use strict';

(function () {

  var urlService = function () {

    var rootData = 'https://scrummy.firebaseio.com';

    var rootAvatar = 'http://www.gravatar.com/avatar';

    var data = function (user, type) {
      return rootData + '/users/' + user.id + '/' + type;
    };

    var user = function(userName){
      return data + '/users/' + userName + '/account';
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