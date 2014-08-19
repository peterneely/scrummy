'use strict';

(function(){

  var mainController = ['currentUser', function (currentUser) {

    var self = this;

    self.user = currentUser;

    self.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }];

  angular
    .module('scrummyApp')
    .controller('Main', mainController);
})();

