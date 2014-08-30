'use strict';

(function () {

  var navController = ['Location', 'initialData', function (Location, initialData) {
    var self = this;

    self.active = function () {
      return Location.isActive();
    };

    self.go = function (page) {
      Location.go(page);
    };

    self.picUrl = initialData.data.user.pic;
  }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();