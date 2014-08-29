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
            coreData: ['CoreData', function (CoreData) {
              return CoreData.get();
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
          }
        })

        .state('nav.user', {
          url: '^/user',
          templateUrl: 'views/user.html',
          controller: 'User as user',
          views: {
            'nav@auth.timesheet': {
              templateUrl: 'views/nav.html',
              controller: 'Nav as nav'
            }
          }
        });
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();