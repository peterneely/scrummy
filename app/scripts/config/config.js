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

      var timesheet = {
        url: URL.timesheet,
        templateUrl: FILE.timesheet,
        controller: 'Timesheet as time',
      };

      var clients = {
        url: URL.all,
        views: {
          '': {
            templateUrl: FILE.all,
            controller: 'Clients as clients'
          },
          'tabs@clients': {
            templateUrl: FILE.tabs,
            controller: 'Tabs as tabs'
          }
        }
      };

      var projects = {
        url: URL.projects,
        views: {
          '': {
            templateUrl: FILE.projects,
            controller: 'Projects as proj'
          },
          'tabs@projects': {
            templateUrl: FILE.tabs,
            controller: 'Tabs as tabs'
          }
        }
      };

      var tasks = {
        url: URL.tasks,
        views: {
          '': {
            templateUrl: FILE.tasks,
            controller: 'Tasks as tasks'
          },
          'tabs@tasks': {
            templateUrl: FILE.tabs,
            controller: 'Tabs as tabs'
          }
        }
      };

      var user = {
        url: URL.user,
        templateUrl: FILE.user,
        controller: 'User as user'
      };

      $stateProvider
        .state('home', home)
        .state('login', login)
        .state('register', register)
        .state('timesheet', timesheet)
        .state('clients', clients)
        .state('projects', projects)
        .state('tasks', tasks)
        .state('user', user);

      $urlRouterProvider
        .otherwise(URL.home);
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();