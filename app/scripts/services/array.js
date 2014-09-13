'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Array', ArrayService);

  ArrayService.$inject = ['$window'];

  function ArrayService($window) {
    return {
      where: where
    };

    function where(array, props) {
      return $window._.where(array, props);
    }


  }
})();