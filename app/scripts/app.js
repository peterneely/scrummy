'use strict';

(function () {

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
        controller: 'Main'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'Admin'
      })
      .when('/signin', {
        templateUrl: '../views/signin.html',
        controller: 'Signin'
      })
      .otherwise({
        redirectTo: '/'
      });
  };

  angular
    .module('scrummyApp', require)
    .constant('FIREBASE_URL', 'https://scrummy.firebaseio.com/')
    .config(routes);
})();


