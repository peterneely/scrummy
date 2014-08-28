'use strict';

(function () {

  var navController = ['User', 'Location', 'coreData', function (User, Location, coreData) {
    var self = this;

    console.log(coreData);
    self.show = coreData.user !== null;

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