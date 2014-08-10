'use strict';

/**
 * @ngdoc function
 * @name scrummyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scrummyApp
 */
angular.module('scrummyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
