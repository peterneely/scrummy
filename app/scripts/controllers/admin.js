'use strict';

(function(){

  var adminController = function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  };

  angular.module('scrummyApp').controller('Admin', adminController);
})();

