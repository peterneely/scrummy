'use strict';

(function () {

  var urls = {
    firebase: 'https://scrummy.firebaseio.com/',
    home:  '/',
    login: '/login',
    register: '/register',
    user: '/user'
  };

  var files = {
    home: 'views/main.html',
    login: 'views/login.html',
    register: 'views/register.html',
    user: 'views/admin.html',
    footer: 'views/footer.html',
    navbar: 'views/nav.html'
  };

  angular
    .module('scrummyApp')
    .constant('URL', urls)
    .constant('FILE', files);
})();