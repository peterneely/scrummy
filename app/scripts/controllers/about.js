'use strict';

/**
 * @ngdoc function
 * @name scrummyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the scrummyApp
 */
angular.module('scrummyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
