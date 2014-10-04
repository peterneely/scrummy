'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('$', jQueryService)
    .factory('Firebase', FirebaseService)
    .factory('_', LodashService);

  jQueryService.$inject = ['$window'];
  function jQueryService($window){
    return $window.$;
  }

  FirebaseService.$inject = ['$window'];
  function FirebaseService($window) {
    return $window.Firebase;
  }

  LodashService.$inject = ['$window'];
  function LodashService($window) {
    return $window._;
  }

})();