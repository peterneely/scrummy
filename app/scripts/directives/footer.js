'use strict';

(function(){

  var footerDirective = function (){
    return {
      restrict: 'A',
      templateUrl: 'views/footer.html',
      controller: 'Footer',
      controllerAs: 'footerCtrl'
    };
  };

  angular
    .module('scrummyApp')
    .directive('scrummyFooter', footerDirective);
})();

