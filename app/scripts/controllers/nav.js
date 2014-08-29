'use strict';

(function () {

  var navController = ['User', 'Location', function (User, Location) {
    var self = this;

    self.show = true;

    self.active = function () {
      return Location.isActive();
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