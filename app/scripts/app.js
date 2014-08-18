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
        controller: 'Main',
        controllerAs: 'main'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'Signin',
        controllerAs: 'sc'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'Register',
        controllerAs: 'rc'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'Admin',
        controllerAs: 'admin'
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


