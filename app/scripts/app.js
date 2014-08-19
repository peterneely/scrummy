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
        controllerAs: 'mainCtrl'
//        resolve: {
//          'currentUser': ['$firebaseSimpleLogin', function($firebaseSimpleLogin) {
//            var ref = new Firebase('https://scrummy.firebaseio.com/');
//            var fb = $firebaseSimpleLogin(ref);
//            return fb.$getCurrentUser();
//          }]
//        }
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
  };

  angular
    .module('scrummyApp', require)
    .constant('FIREBASE_URL', 'https://scrummy.firebaseio.com/')
    .config(routes);
})();


