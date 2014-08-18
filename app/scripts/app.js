'use strict';

(function () {

  var require = [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ];

  var routes = function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'Main'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'Signin'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'Register'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'Admin'
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


