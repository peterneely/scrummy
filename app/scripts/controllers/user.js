'use strict';

(function(){

  var userController = function () {

    var self = this;

    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  };

  angular
    .module('scrummyApp')
    .controller('User', userController);
})();

