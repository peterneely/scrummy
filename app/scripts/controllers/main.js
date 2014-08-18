'use strict';

(function(){

  var mainController = function () {

    var self = this;
    
    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  };

  angular
    .module('scrummyApp')
    .controller('Main', mainController);
})();

