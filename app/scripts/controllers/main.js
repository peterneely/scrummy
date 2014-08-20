'use strict';

(function(){

  var mainController = ['Location', function (Location) {

    var self = this;

    self.urlFor = function (key) {
      return Location.urlFor(key);
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Main', mainController);
})();

