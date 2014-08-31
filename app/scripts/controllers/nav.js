'use strict';

(function () {

  var navController = ['State', 'coreData', function (State, coreData) {
    var self = this;

    self.active = function () {
      return State.isActive();
    };

    self.picUrl = coreData.user.pic;
  }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();