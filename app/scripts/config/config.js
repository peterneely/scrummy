'use strict';

(function () {

  var states = ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('root', {
          abstract: true,
          url: '/root',
          template: '<div ui-view></div>',
          controller: 'Nav as nav',
          resolve: {
            coreData: ['CoreData', function(CoreData){
              return CoreData.get();
            }]
          }
        })

        .state('root.home', {
          url: '^/',
          templateUrl: 'views/main.html',
          controller: 'Main as main',
          resolve: {
            data: function(coreData){
              return coreData;
            }
          }
        })

        .state('root.login', {
          url: '^/login',
          templateUrl: 'views/login.html',
          controller: 'Auth as auth',
          resolve: {
            data: function(coreData){
              return coreData;
            }
          }
        })

        .state('root.register', {
          url: '^/register',
          templateUrl: 'views/register.html',
          controller: 'Auth as auth',
          resolve: {
            data: function(coreData){
              return coreData;
            }
          }
        })

        .state('root.timesheet', {
          url: '^/timesheet',
          templateUrl: 'views/timesheet.html',
          controller: 'Timesheet as timesheet',
          resolve: {
            data: function(coreData){
              return coreData;
            }
          }
        })

        .state('root.clients', {
          url: '^/clients',
          views: {
            '': {
              templateUrl: 'views/manage.html',
              controller: 'Manage as manage'
            },
            'tabs@clients': {
              templateUrl: 'views/tabs.html',
              controller: 'Tabs as tabs'
            }
          },
          resolve: {
            data: function(coreData){
              return coreData.clients;
            }
          }
        })

        .state('root.projects', {
          url: '^/projects',
          views: {
            '': {
              templateUrl: 'views/manage.html',
              controller: 'Manage as manage'
            },
            'tabs@projects': {
              templateUrl: 'views/tabs.html',
              controller: 'Tabs as tabs'
            }
          },
          resolve: {
            data: function(coreData){
              return coreData.projects;
            }
          }
        })

        .state('root.tasks', {
          url: '^/tasks',
          views: {
            '': {
              templateUrl: 'views/manage.html',
              controller: 'Manage as manage'
            },
            'tabs@tasks': {
              templateUrl: 'views/tabs.html',
              controller: 'Tabs as tabs'
            }
          },
          resolve: {
            data: function(coreData){
              return coreData.tasks;
            }
          }
        })

        .state('root.user', {
          url: '^/user',
          templateUrl: 'views/user.html',
          controller: 'User as user',
          resolve: {
            data: function(coreData){
              return coreData;
            }
          }
        });

      $urlRouterProvider
        .otherwise('^/');
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();