'use strict';

(function(){

  var footerDirective = function (){
    return {
      restrict: 'A',
      templateUrl: 'views/footer.html',
      controller: 'Footer',
      controllerAs: 'foot'
    };
  };

  angular
    .module('scrummyApp')
    .directive('scrummyFooter', footerDirective);
})();

