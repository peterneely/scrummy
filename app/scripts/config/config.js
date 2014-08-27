'use strict';

(function () {

  var states = ['$stateProvider', '$urlRouterProvider', 'URL', 'FILE',
    function ($stateProvider, $urlRouterProvider, URL, FILE) {

      $stateProvider
        .state('root', {
          abstract: true,
          url: '/root',
          template: '<div ui-view></div>',
          resolve: {
            clients: ['Clients', function(Clients){
//              return Data.all('clients').$loaded().then(function(data){
//                //console.log(data);
//                return data;
//              });
              return Clients.clientsPromise();
            }]
          }
        })

        .state('root.home', {
          url: '^/',
          templateUrl: 'views/main.html',
          controller: 'Main as main'
        })

        .state('root.login', {
          url: '^/login',
          templateUrl: FILE.login,
          controller: 'Auth as auth'
        })

        .state('root.register', {
          url: '^/register',
          templateUrl: FILE.register,
          controller: 'Auth as auth'
        })

        .state('root.timesheet', {
          url: '^/timesheet',
          templateUrl: FILE.timesheet,
          controller: 'Timesheet as timesheet'
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
            clients: function(clients){
              console.log(clients);
              return clients;
            }
          }
        })

        .state('root.projects', {
          url: '^/projects',
          views: {
            '': {
              templateUrl: FILE.manage,
              controller: 'Manage as manage'
            },
            'tabs@projects': {
              templateUrl: FILE.tabs,
              controller: 'Tabs as tabs'
            }
          }
        })

        .state('root.tasks', {
          url: '^/tasks',
          views: {
            '': {
              templateUrl: FILE.manage,
              controller: 'Manage as manage'
            },
            'tabs@tasks': {
              templateUrl: FILE.tabs,
              controller: 'Tabs as tabs'
            }
          }
        })

        .state('root.user', {
          url: '^/user',
          templateUrl: 'views/user.html',
          controller: 'User as user'
        });

      $urlRouterProvider
        .otherwise('^/');
    }];

  angular
    .module('scrummyApp')
    .config(states);
})();