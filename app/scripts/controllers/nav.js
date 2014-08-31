'use strict';

(function () {

  var navController = ['State', 'viewData2', function (State, viewData2) {
    var self = this;

    self.active = function () {
      return State.isActive();
    };

    self.picUrl = viewData2.user.pic;
  }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();