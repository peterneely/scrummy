'use strict';

(function(){

  var adminController = ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }];

  angular
    .module('scrummyApp')
    .controller('Admin', adminController);
})();

