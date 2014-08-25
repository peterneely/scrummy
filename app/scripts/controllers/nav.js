'use strict';

(function () {

  var navController = ['User', 'Location', function (User, Location) {
      var self = this;

      User.whenLoggedIn(function () {
        self.show = true;

        self.active = function(){
          return Location.isActive();
        };

        self.picUrl = function () {
          return User.picUrl();
        };
      });

      User.whenLoggedOut(function () {
        self.show = false;
      });

      self.go = function (page) {
        Location.go(page);
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();