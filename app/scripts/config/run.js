'use strict';

(function(){

  var run = ['$rootScope', function($rootScope){
    $rootScope.debug = false;
  }];

  angular
    .module('scrummyApp')
    .run(run);
})();