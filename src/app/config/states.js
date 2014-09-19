'use strict';

(function () {

  angular
    .module('scrummyApp')
    .config(States);

  States.$inject = ['$stateProvider', '$urlRouterProvider'];

  function States($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', home())
      .state('login', login())
      .state('register', register())
      .state('nav', nav())
      .state('nav.timesheet', navTimesheet())
      .state('nav.clients', navClients())
      .state('nav.projects', navProjects())
      .state('nav.tasks', navTasks())
      .state('nav.user', navUser());

    $urlRouterProvider
      .otherwise('/');

    function home() {
      return {
        url: '/',
        templateUrl: '/app/layout/main.html'
      };
    }

    function login() {
      return {
        url: '/login',
        templateUrl: '/app/auth/login.html',
        controller: 'Auth as auth'
      };
    }

    function register() {
      return {
        url: '/register',
        templateUrl: '../../views/register.html',
        controller: 'Auth as auth'
      };
    }

    function nav() {
      return {
        abstract: true,
        templateUrl: '../../views/nav.html',
        controller: 'Nav as nav',
        resolve: {
          coreData: ['Init', function (Init) {
            return Init.getCoreData();
          }]
        }
      };
    }

    function navTimesheet() {
      return {
        url: '^/timesheet',
        templateUrl: '../../views/timesheet.html',
        controller: 'Timesheet as ts',
        resolve: {
          viewData: ['coreData', function (coreData) {
            return {
              user: coreData.user,
              clients: coreData.clients,
              projects: coreData.projects,
              tasks: coreData.tasks,
              times: coreData.times,
              type: 'times'
            };
          }]
        }
      };
    }

    function navClients() {
      return {
        url: '^/clients',
        views: {
          '': {
            templateUrl: '../../views/manage.html',
            controller: 'Manage as manage'
          },
          '@nav.clients': {
            templateUrl: '../../views/tabs.html'
          }
        },
        resolve: {
          viewData: ['coreData', function (coreData) {
            return {
              user: coreData.user,
              items: coreData.clients,
              times: coreData.times,
              type: 'clients'
            };
          }]
        }
      };
    }

    function navProjects() {
      return {
        url: '^/projects',
        views: {
          '': {
            templateUrl: '../../views/manage.html',
            controller: 'Manage as manage'
          },
          '@nav.projects': {
            templateUrl: '../../views/tabs.html'
          }
        },
        resolve: {
          viewData: ['coreData', function (coreData) {
            return {
              user: coreData.user,
              items: coreData.projects,
              times: coreData.times,
              type: 'projects'
            };
          }]
        }
      };
    }

    function navTasks() {
      return {
        url: '^/tasks',
        views: {
          '': {
            templateUrl: '../../views/manage.html',
            controller: 'Manage as manage'
          },
          '@nav.tasks': {
            templateUrl: '../../views/tabs.html'
          }
        },
        resolve: {
          viewData: ['coreData', function (coreData) {
            return {
              user: coreData.user,
              items: coreData.tasks,
              times: coreData.times,
              type: 'tasks'
            };
          }]
        }
      };
    }

    function navUser() {
      return {
        url: '^/user',
        templateUrl: '../../views/user.html',
        controller: 'User as user',
        resolve: {
          viewData: ['coreData', function (coreData) {
            return {
              user: coreData.user
            };
          }]
        }
      };
    }
  }

})();