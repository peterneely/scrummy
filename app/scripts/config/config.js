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
          controller: 'Main as main',
//          resolve: {
//            data: function (coreData) {
//              return coreData;
//            }
//          }
        })

        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'Auth as auth',
//          resolve: {
//            data: function (coreData) {
//              return coreData;
//            }
//          }
        })

        .state('register', {
          url: '/register',
          templateUrl: 'views/register.html',
          controller: 'Auth as auth',
//          resolve: {
//            data: function (coreData) {
//              return coreData;
//            }
//          }
        })

        .state('nav', {
          abstract: true,
          url: '/nav',
          templateUrl: 'views/nav.html',
          controller: 'Nav as nav',
          resolve: {
            coreData: ['Init', function (Init) {
              return Init.onReload();
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
            '@auth': {
              templateUrl: 'views/manage.html',
              controller: 'Manage as manage'
            },
            'nav@nav.projects': {
              templateUrl: 'views/nav.html',
              controller: 'Nav as nav'
            },
            'tabs@nav.projects': {
              templateUrl: 'views/tabs.html',
              controller: 'Tabs as tabs'
            }
          },
          resolve: {
            data: function (coreData) {
              return coreData.projects;
            }
          }
        })

        .state('nav.tasks', {
          url: '^/tasks',
          views: {
            '@auth': {
              templateUrl: 'views/manage.html',
              controller: 'Manage as manage'
            },
            'nav@auth.tasks': {
              templateUrl: 'views/nav.html',
              controller: 'Nav as nav'
            },
            'tabs@auth.tasks': {
              templateUrl: 'views/tabs.html',
              controller: 'Tabs as tabs'
            }
          },
          resolve: {
            data: function (coreData) {
              return coreData.tasks;
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
          },
          resolve: {
            data: function (coreData) {
              return coreData;
            }
          }
        });
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();