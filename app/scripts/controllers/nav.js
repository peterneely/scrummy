'use strict';

(function () {

  var navController = ['$state', 'User', 'Location',
    function ($state, User, Location) {

      var self = this;

      User.whenLoggedIn(function () {
        self.selected = $state.current.data.selectedNav;

        self.show = true;

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