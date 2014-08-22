'use strict';

(function () {

  var navController = ['User', 'Location', 'URL',
    function (User, Location, URL) {

      var self = this;

      self.selected = 'timesheet';

      self.show = function () {
        return User.isLoggedIn();
      };

      self.picUrl = function () {
        var userCode = User.getCurrentUser().md5_hash;
        var defaultPic = '?d=mm'; // See https://en.gravatar.com/site/implement/images/
        return URL.gravatar + userCode + defaultPic;
      };

      self.go = function (page) {
        Location.go(page)
      }
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();