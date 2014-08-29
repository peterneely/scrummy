'use strict';

(function () {

  var navController = ['Location', function (Location) {
    var self = this;

    self.show = true;

    self.active = function () {
      return Location.isActive();
    };

    self.go = function (page) {
      Location.go(page);
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();