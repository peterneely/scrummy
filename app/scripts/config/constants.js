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
    timesheet: '/timesheet'
  };

  var files = {
    home: 'views/main.html',
    login: 'views/login.html',
    register: 'views/register.html',
    user: 'views/user.html',
    settings: 'views/settings.html',
    timesheet: 'views/timesheet.html',
    footer: 'views/footer.html',
    navbar: 'views/nav.html'
  };

  angular
    .module('scrummyApp')
    .constant('URL', urls)
    .constant('FILE', files);
})();