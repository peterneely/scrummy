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
      .state('nav.times', navTimes())
      .state('nav.clients', navClients())
      .state('nav.projects', navProjects())
      .state('nav.tasks', navTasks())
      .state('nav.user', navUser());

    $urlRouterProvider
      .otherwise('/');

    function home() {
      return {
        url: '/',
        templateUrl: '/app/app/main.html'
      };
    }

    function login() {
      return {
        url: '/login',
        templateUrl: '/app/user/login.html',
        controller: 'Auth as auth'
      };
    }

    function register() {
      return {
        url: '/register',
        templateUrl: '/app/user/register.html',
        controller: 'Auth as auth'
      };
    }

    function nav() {
      return {
        abstract: true,
        templateUrl: '/app/app/nav.html',
        controller: 'Nav as nav',
        resolve: {
          coreData: ['Init', function (Init) {
            return Init.getCoreData();
          }]
        }
      };
    }

    function navTimes() {
      return {
        url: '^/times',
        templateUrl: '/app/time/times.html',
        controller: 'Times as ts',
        resolve: {
          viewData: ['coreData', 'Time', function (coreData, Time) {
            return {
              user: coreData.user,
              clients: Time.map(coreData.clients),
              projects: Time.map(coreData.projects),
              tasks: Time.map(coreData.tasks),
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
            templateUrl: '../app/admin/admin.html',
            controller: 'Admin as admin'
          },
          '@nav.clients': {
            templateUrl: '/app/admin/tabs.html'
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
            templateUrl: '../app/admin/admin.html',
            controller: 'Admin as admin'
          },
          '@nav.projects': {
            templateUrl: '/app/admin/tabs.html'
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
            templateUrl: '../app/admin/admin.html',
            controller: 'Admin as admin'
          },
          '@nav.tasks': {
            templateUrl: '/app/admin/tabs.html'
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
        templateUrl: '/app/user/user.html',
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