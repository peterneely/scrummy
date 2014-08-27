'use strict';

(function () {

  var urls = {
    firebase: 'https://scrummy.firebaseio.com/users/',
    gravatar: 'http://www.gravatar.com/avatar/'
//    current: '',
//    home:  '/',
//    login: '/login',
//    register: '/register',
//    user: '/user',
//    clients: '/clients',
//    projects: '/projects',
//    tasks: '/tasks',
//    timesheet: '/timesheet'
  };

//  var files = {
//    home: 'views/main.html',
//    login: 'views/login.html',
//    register: 'views/register.html',
//    user: 'views/user.html',
//    tabs: 'views/tabs.html',
//    manage: 'views/manage.html',
//    timesheet: 'views/timesheet.html',
//    footer: 'views/footer.html',
//    navbar: 'views/nav.html',
//    time: 'views/time.html'
//  };

  angular
    .module('scrummyApp')
    .constant('URL', urls);
//    .constant('FILE', files);
})();