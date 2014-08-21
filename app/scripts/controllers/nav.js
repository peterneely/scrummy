'use strict';

(function () {

  var navController = ['User', 'Auth', 'Location', 'URL',
    function (User, Auth, Location, URL) {

      var self = this;

      self.show = function () {
        return Location.isNotPages(['home', 'login', 'register']);
      };

      self.picUrl = function () {
        var userCode = User.getCurrentUser().md5_hash;
        var defaultPic = '?d=wavatar'; // See https://en.gravatar.com/site/implement/images/
        return URL.gravatar + userCode + defaultPic;
//        return "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=wavatar";
      };

      self.urlFor = function (page) {
        return Location.urlFor(page);
      };

      self.logout = function () {
        Auth.logout();
        User.removeCurrentUser();
        Location.go('home');
      };

      self.isPage = function (page) {
        return Location.isPage(page);
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();