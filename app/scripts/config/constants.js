'use strict';

(function () {

  var urls = {
    firebase: 'https://scrummy.firebaseio.com/users/',
    gravatar: 'http://www.gravatar.com/avatar/',
    current: '',
    home:  '/',
    login: '/login',
    register: '/register',
    user: '/user',
    settings: '/settings',
    all: '/clients',
    projects: '/projects',
    tasks: '/tasks',
    timesheet: '/timesheet'
  };

  var files = {
    home: 'views/main.html',
    login: 'views/login.html',
    register: 'views/register.html',
    user: 'views/user.html',
    tabs: 'views/tabs.html',
    all: 'views/clients.html',
    projects: 'views/projects.html',
    tasks: 'views/tasks.html',
    timesheet: 'views/timesheet.html',
    footer: 'views/footer.html',
    navbar: 'views/nav.html'
  };

  angular
    .module('scrummyApp')
    .constant('URL', urls)
    .constant('FILE', files);
})();