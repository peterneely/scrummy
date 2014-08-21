'use strict';

(function () {

  var navController = ['User', 'Auth', 'Location', 'URL',
    function (User, Auth, Location, URL) {

      var self = this;

      self.show = function () {
        return Location.isNotPages(['home', 'login', 'register']);
      };

      self.picUrl = function () {
        return URL.gravatar + User.getCurrentUser().md5_hash;
      };

      self.urlFor = function (page) {
        return Location.urlFor(page);
      };

      self.logout = function () {
        Auth.logout();
        User.removeCurrentUser();
        Location.navigateTo('home');
      };

//      self.isLocation = function (page) {
//        return Location.is(page);
//      };
//
//
//      self.isLoggedIn = function () {
//        return User.isLoggedIn();
//      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();