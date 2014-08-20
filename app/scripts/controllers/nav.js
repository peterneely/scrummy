'use strict';

(function () {

  var navController = ['User', 'Auth', 'Location',
    function (User, Auth, Location) {

      var self = this;

      self.show = function () {
        return Location.isNotPages(['home', 'login', 'register']);
      };

      self.isLocation = function (key) {
        return Location.is(key);
      };

      self.urlFor = function (key) {
        return Location.urlFor(key);
      };

      self.isLoggedIn = function () {
        return User.isLoggedIn();
      };

      self.logout = function () {
        Auth.logout();
        User.removeCurrentUser();
        Location.navigateTo('home');
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Nav', navController);
})();