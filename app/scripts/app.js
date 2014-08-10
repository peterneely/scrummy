'use strict';

(function(){

  var require = [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ];

  var routes = function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  };

  /**
   * @ngdoc overview
   * @name scrummyApp
   * @description
   * # scrummyApp
   *
   * Main module of the application.
   */
  angular
    .module('scrummyApp', require)
    .config(routes);
})();


