'use strict';

(function () {

  var mainController = ['Location', function (Location) {

    var self = this;

    self.go = function (page) {
      Location.go(page);
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Main', mainController);
})();

