'use strict';

(function () {

  var mainController = ['User', 'Location', function (User, Location) {

    var self = this;

    self.login = function () {
      Location.navigateTo('login');
    };

    self.register = function () {
      Location.navigateTo('register');
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Main', mainController);
})();

