'use strict';

(function () {

  var userService = ['$q', '$rootScope', 'CoreData', 'Auth', 'Location', 'URL',
    function ($q, $rootScope, CoreData, Auth, Location, URL) {

      var getCurrentUser = function () {
        return CoreData.user();
      };

      var isLoggedIn = function () {
        console.log(CoreData.user());
        return CoreData.user() !== null;
      };

      // See https://en.gravatar.com/site/implement/images/
      var picUrl = function () {
        var user = CoreData.user();
        if (user) {
          var userId = user.hash;
          var defaultPic = '?d=mm';
          return URL.gravatar + userId + defaultPic;
        }
      };

      var logout = function(){
        Auth.logout();
        Location.onLogout();
      };

      return {
        getAuthenticatedUser: getCurrentUser,
        isLoggedIn: isLoggedIn,
        logout: logout,
        picUrl: picUrl
      };
    }];

  angular
    .module('scrummyApp')
    .factory('User', userService);
})();