'use strict';

(function(){

  var footerDirective = ['FILE', function (FILE){
    return {
      restrict: 'A',
      templateUrl: FILE.footer,
      controller: 'Footer',
      controllerAs: 'foot'
    };
  }];

  angular
    .module('scrummyApp')
    .directive('scrummyFooter', footerDirective);
})();
