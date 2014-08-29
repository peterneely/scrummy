'use strict';

(function () {

  var footerController = ['User', function (User) {

    var self = this;

    self.currentUser = function () {
      return User.getAuthenticatedUser();
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Footer', footerController);
})();