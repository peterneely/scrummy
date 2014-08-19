'use strict';

(function(){

  var adminController = function () {

    var self = this;

    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  };

  angular
    .module('scrummyApp')
    .controller('Admin', adminController);
})();

