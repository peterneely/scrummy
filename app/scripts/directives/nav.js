'use strict';

(function(){

  var nav = function (){

    return {
      restrict: 'A',
      templateUrl: 'views/nav.html',
      controller: 'NavCtrl'
    };
  };

  angular.module('scrummyApp').directive('scrummyNav', nav);
})();

