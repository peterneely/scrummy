'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Firebase', FirebaseService)
    .factory('_', LodashService);

  FirebaseService.$inject = ['$window'];
  function FirebaseService($window) {
    return $window.Firebase;
  }

  LodashService.$inject = ['$window'];
  function LodashService($window) {
    return $window._;
  }

})();