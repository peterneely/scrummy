'use strict';

(function () {

  var navController = ['State', 'initialData', function (State, initialData) {
    var self = this;

    self.active = function () {
      return State.isActive();
    };

    self.picUrl = initialData.user.pic;
  }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();