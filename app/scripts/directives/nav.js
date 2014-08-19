'use strict';

(function(){

  var navbarDirective = ['FILE', function (FILE){
    return {
      restrict: 'A',
      templateUrl: FILE.navbar,
      controller: 'Nav',
      controllerAs: 'navCtrl'
    };
  }];

  angular
    .module('scrummyApp')
    .directive('scrummyNavbar', navbarDirective);
})();

