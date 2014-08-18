'use strict';

(function () {

  var userService = ['$rootScope', function ($rootScope) {

      var setCurrentUser = function (user) {
        $rootScope.user = user;
      };

      var getCurrentUser = function () {
        return $rootScope.user;
      };

      var removeCurrentUser = function() {
        $rootScope.user = null;
      };

      return {
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser,
        removeCurrentUser: removeCurrentUser
      };
    }];

  angular
    .module('scrummyApp')
    .factory('User', userService);
})();