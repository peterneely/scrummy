'use strict';

(function () {

  var states = ['$stateProvider', '$urlRouterProvider', 'URL', 'FILE',
    function ($stateProvider, $urlRouterProvider, URL, FILE) {

      var home = {
        url: URL.home,
        templateUrl: FILE.home,
        controller: 'Main as main'
      };

      var login = {
        url: URL.login,
        templateUrl: FILE.login,
        controller: 'Auth as auth'
      };

      var register = {
        url: URL.register,
        templateUrl: FILE.register,
        controller: 'Auth as auth'
      };

      var user = {
        url: URL.user,
        templateUrl: FILE.user,
        controller: 'User as user'
      };

      var manage = {
        url: URL.manage,
        templateUrl: FILE.manage,
        controller: 'Manage as man'
      };

      var timesheet = {
        url: URL.timesheet,
        templateUrl: FILE.timesheet,
        controller: 'Timesheet as time'
      };

      $stateProvider
        .state('home', home)
        .state('login', login)
        .state('register', register)
        .state('user', user)
        .state('manage', manage)
        .state('timesheet', timesheet);

      $urlRouterProvider.otherwise(URL.home);
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();