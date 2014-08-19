'use strict';

(function(){

  var navDirective = function (){
    return {
      restrict: 'A',
      templateUrl: 'views/nav.html',
      controller: 'Nav',
      controllerAs: 'navCtrl'
    };
  };

  angular
    .module('scrummyApp')
    .directive('scrummyNav', navDirective);
})();

