'use strict';

(function(){

  var routes = ['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'Main',
        controllerAs: 'mainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'Login',
        controllerAs: 'loginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'Register',
        controllerAs: 'registerCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'Admin',
        controllerAs: 'adminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }];

  angular
    .module('scrummyApp')
    .config(routes);
})();