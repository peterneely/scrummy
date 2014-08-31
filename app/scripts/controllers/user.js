'use strict';

(function () {

  var userController = ['Auth', 'viewData', function (Auth, viewData) {

    var self = this;

    console.log(viewData);

    self.logout = function () {
      Auth.logout();
    };
  }];

  angular
    .module('scrummyApp')
    .controller('User', userController);
})();

