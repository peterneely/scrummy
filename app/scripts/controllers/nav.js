'use strict';

(function () {

  var navController = ['State', 'initialData', function (State, viewData) {
    var self = this;

    self.active = function () {
      return State.isActive();
    };

    self.picUrl = viewData.user.pic;
  }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();