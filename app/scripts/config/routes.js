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
          controllerAs: 'log'
        })
        .when(URL.register, {
          templateUrl: FILE.register,
          controller: 'Register',
          controllerAs: 'reg'
        })
        .when(URL.user, {
          templateUrl: FILE.user,
          controller: 'User',
          controllerAs: 'user'
        })
        .when(URL.manage, {
          templateUrl: FILE.manage,
          controller: 'Manage',
          controllerAs: 'man'
        })
        .when(URL.timesheet, {
          templateUrl: FILE.timesheet,
          controller: 'Timesheet',
          controllerAs: 'time'
        })
        .otherwise({
          redirectTo: URL.home
        });
    }];

  angular
    .module('scrummyApp')
    .config(routes);
})();