'use strict';

(function () {

  var routes = ['$routeProvider', 'URL', 'FILE',
    function ($routeProvider, URL, FILE) {

      $routeProvider
        .when(URL.home, {
          templateUrl: FILE.home,
          controller: 'Main',
          controllerAs: 'mainCtrl'
        })
        .when(URL.login, {
          templateUrl: FILE.login,
          controller: 'Login',
          controllerAs: 'loginCtrl'
        })
        .when(URL.register, {
          templateUrl: FILE.register,
          controller: 'Register',
          controllerAs: 'registerCtrl'
        })
        .when(URL.user, {
          templateUrl: FILE.user,
          controller: 'User',
          controllerAs: 'userCtrl'
        })
        .otherwise({
          redirectTo: URL.home
        });
    }];

  angular
    .module('scrummyApp')
    .config(routes);
})();