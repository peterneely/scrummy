'use strict';

(function(){

  var navDirective = function (){
    return {
      restrict: 'A',
      templateUrl: 'views/nav.html',
      controller: 'Nav'
    };
  };

  angular
    .module('scrummyApp')
    .directive('scrummyNav', navDirective);
})();

