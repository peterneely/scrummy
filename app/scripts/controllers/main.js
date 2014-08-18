'use strict';

(function(){

  var mainController = ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }];

  angular
    .module('scrummyApp')
    .controller('Main', mainController);
})();

