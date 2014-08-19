'use strict';

(function(){

  var navbarDirective = ['FILE', function (FILE){
    return {
      restrict: 'A',
      templateUrl: FILE.navbar,
      controller: 'Nav',
      controllerAs: 'nav'
    };
  }];

  angular
    .module('scrummyApp')
    .directive('scrummyNavbar', navbarDirective);
})();

