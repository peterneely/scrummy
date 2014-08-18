'use strict';

(function(){

  var Main = function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  };

  angular.module('scrummyApp').controller('MainCtrl', Main);
})();

