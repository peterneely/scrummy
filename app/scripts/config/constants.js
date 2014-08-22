'use strict';

(function () {

  var urls = {
    firebase: 'https://scrummy.firebaseio.com/',
    gravatar: 'http://www.gravatar.com/avatar/',
    current: '',
    home:  '/',
    login: '/login',
    register: '/register',
    user: '/user',
    settings: '/settings',
    settingsClients: '/clients',
    settingsProjects: '/projects',
    settingsTasks: '/tasks',
    timesheet: '/timesheet'
  };

  var files = {
    home: 'views/main.html',
    login: 'views/login.html',
    register: 'views/register.html',
    user: 'views/user.html',
    settings: 'views/settings.html',
    settingsClients: 'views/settings.clients.html',
    settingsProjects: 'views/settings.projects.html',
    settingsTasks: 'views/settings.tasks.html',
    timesheet: 'views/timesheet.html',
    footer: 'views/footer.html',
    navbar: 'views/nav.html'
  };

  angular
    .module('scrummyApp')
    .constant('URL', urls)
    .constant('FILE', files);
})();