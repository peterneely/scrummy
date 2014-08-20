'use strict';

(function () {

  var mainController = ['User', 'Location', function (User, Location) {

    var self = this;

    self.start = function () {
      return User.isLoggedIn() ? Location.urlFor('timesheet') : Location.urlFor('login');
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Main', mainController);
})();

