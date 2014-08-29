'use strict';

(function () {

  var userController = ['Auth', function (Auth) {

    var self = this;

    self.logout = function () {
      Auth.logout();
    };
  }];

  angular
    .module('scrummyApp')
    .controller('User', userController);
})();

