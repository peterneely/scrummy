'use strict';

(function () {

  var urls = {
    firebase: 'https://scrummy.firebaseio.com/',
    current: '',
    home:  '/',
    login: '/login',
    register: '/register',
    user: '/user',
    manage: '/manage',
    timesheet: '/timesheet'
  };

  var files = {
    home: 'views/main.html',
    login: 'views/login.html',
    register: 'views/register.html',
    user: 'views/user.html',
    manage: 'views/manage.html',
    timesheet: 'views/timesheet.html',
    footer: 'views/footer.html',
    navbar: 'views/nav.html'
  };

  angular
    .module('scrummyApp')
    .constant('URL', urls)
    .constant('FILE', files);
})();