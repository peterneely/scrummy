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
        controller: 'User as user',
      };

      var settings = {
        abstract: true,
        url: URL.settings,
        templateUrl: FILE.settings,
        controller: 'Settings as set'
      };

      var settingsClients = {
        url: URL.settingsClients,
        templateUrl: FILE.settingsClients,
        controller: 'Settings as set',
        data: {
          activeNav: 'settings'
        }
      };

      var settingsProjects = {
        url: URL.settingsProjects,
        templateUrl: FILE.settingsProjects,
        controller: 'Settings as set',
        data: {
          activeNav: 'projects'
        }
      };

      var settingsTasks = {
        url: URL.settingsTasks,
        templateUrl: FILE.settingsTasks,
        controller: 'Settings as set',
        data: {
          activeNav: 'tasks'
        }
      };

      var timesheet = {
        url: URL.timesheet,
        templateUrl: FILE.timesheet,
        controller: 'Timesheet as time',
      };

      $stateProvider
        .state('home', home)
        .state('login', login)
        .state('register', register)
        .state('user', user)
        .state('settings', settings)
        .state('settings.clients', settingsClients)
        .state('settings.projects', settingsProjects)
        .state('settings.tasks', settingsTasks)
        .state('timesheet', timesheet);

      $urlRouterProvider
        .when('/settings', '/settings/clients')
        .when('/settings/', '/settings/clients')
        .otherwise(URL.home);
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();