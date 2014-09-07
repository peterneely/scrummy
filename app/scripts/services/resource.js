'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config'];

  function ResourceService($firebase, Config) {

    return {
      data: data,
      related: related,
      user: user
    };

    function data(user, type) {
      return resource(url(user.userName, type));
    }

    function related(user, relatedType, relatedItemId, type){
      var rootUrl = url(user.userName, relatedType);
      var relatedUrl = rootUrl + '/' + relatedItemId + '/' + type;
      return resource(relatedUrl);
    }

    function resource(url) {
      return $firebase(new Firebase(url));
    }

    function url(userName, dataType){
      return Config.urlData + userName + '/' + dataType;
    }

    function user(userName) {
      return resource(url(userName, 'user'));
    }
  }

})();