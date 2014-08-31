'use strict';

(function () {

  var userController = ['Auth', 'viewData2', function (Auth, viewData2) {

    var self = this;

    console.log(viewData2);

    self.logout = function () {
      Auth.logout();
    };
  }];

  angular
    .module('scrummyApp')
    .controller('User', userController);
})();

