'use strict';

(function(){

  var Admin = function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  };

  angular.module('scrummyApp').controller('AdminCtrl', Admin);
})();

