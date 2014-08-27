'use strict';

(function(){

  var navbarDirective = function (){
    return {
      restrict: 'A',
      templateUrl: 'views/nav.html',
      controller: 'Nav',
      controllerAs: 'nav'
    };
  };

  angular
    .module('scrummyApp')
    .directive('scrummyNavbar', navbarDirective);
})();

