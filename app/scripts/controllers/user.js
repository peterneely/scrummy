'use strict';

(function () {

  var userController = ['User', function (User) {

    var self = this;

    self.logout = function () {
      User.logout();
    };
  }];

  angular
    .module('scrummyApp')
    .controller('User', userController);
})();

