'use strict';

(function () {

  var urlService = ['Config', function (Config) {

    var data = function (userName, type) {
      return Config.urlData + '/users/' + userName + '/' + type;
    };

    var user = function(userName){
      return Config.urlData + '/users/' + userName + '/account';
    };

    return {
      data: data,
      user: user
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Url', urlService);
})();