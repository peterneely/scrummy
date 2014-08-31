'use strict';

(function () {

  var states = ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'Main as main'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'Auth as auth'
        })

        .state('register', {
          url: '/register',
          templateUrl: 'views/register.html',
          controller: 'Auth as auth'
        })

        .state('nav', {
          abstract: true,
          templateUrl: 'views/nav.html',
          controller: 'Nav as nav',
          resolve: {
            initialData: ['Init', function (Init) {
              return Init.data();
            }]
          }
        })

        .state('nav.timesheet', {
          url: '^/timesheet',
          templateUrl: 'views/timesheet.html',
          controller: 'Timesheet as timesheet'
        })

        .state('nav.clients', {
          url: '^/clients',
          views: {
            '': {
              templateUrl: 'views/manage.html',
              controller: 'Manage as manage'
            },
            '@nav.clients': {
              templateUrl: 'views/tabs.html',
              controller: 'Tabs as tabs'
            }
          },
          data: {
            placeholder: 'client'
          }
        })

        .state('nav.projects', {
          url: '^/projects',
          views: {
            '': {
              templateUrl: 'views/manage.html',
              controller: 'Manage as manage'
            },
            '@nav.projects': {
              templateUrl: 'views/tabs.html',
              controller: 'Tabs as tabs'
            }
          },
          data: {
            placeholder: 'project'
          }
        })

        .state('nav.tasks', {
          url: '^/tasks',
          views: {
            '': {
              templateUrl: 'views/manage.html',
              controller: 'Manage as manage'
            },
            '@nav.tasks': {
              templateUrl: 'views/tabs.html',
              controller: 'Tabs as tabs'
            }
          },
          data: {
            placeholder: 'task'
          }
        })

        .state('nav.user', {
          url: '^/user',
          templateUrl: 'views/user.html',
          controller: 'User as user'
        });
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();