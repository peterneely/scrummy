'use strict';

(function () {

  var navController = ['User', 'Location',
    function (User, Location) {

      var self = this;

      self.selected = Location.selectedNavButton;

      self.show = function () {
        return User.isLoggedIn();
      };

      self.picUrl = function () {
        return User.picUrl();
      };

      self.go = function (page) {
        Location.go(page);
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();