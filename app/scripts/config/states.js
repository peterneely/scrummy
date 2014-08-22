'use strict';

(function () {

  var states = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'URL', 'FILE',
    function ($stateProvider, $urlRouterProvider, $locationProvider, URL, FILE) {

      $locationProvider.html5Mode(true);

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

      var settings = {
        url: URL.settings,
        templateUrl: FILE.settings,
        controller: 'Settings as set'
      };

      var settingsClients = {
        url: URL.settingsClients,
        templateUrl: FILE.settingsClients
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
        .state('settings', settings)
        .state('settings.clients', settingsClients)
        .state('timesheet', timesheet);

      $urlRouterProvider.otherwise(URL.home);
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();