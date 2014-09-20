'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('User', UserService);

  UserService.$inject = ['Config', 'Async', 'Url', 'Resource'];

  function UserService(Config, Async, Url, Resource) {

    return {
      create: create,
      get: get
    };

    function create(authUser) {
      return Async.promise(newUser);

      function newUser(deferred) {
        /*jshint camelcase: false */
        var email = authUser.email;
        var user = {
          userName: parseUserName(email),
          email: email,
          pic: Config.urlPic + authUser.md5_hash + '?d=mm'
        };
        Url.cacheUserName(user.userName);
        Resource.put(['user'], user).then(function () {
          deferred.resolve(user);
        });
      }
    }

    function get(authUser) {
      return Async.promise(user);

      function user(deferred) {
        var userName = parseUserName(authUser.email);
        Url.cacheUserName(userName);
        Resource.object(['user']).then(function (user) {
          deferred.resolve(user);
        });
      }
    }

    function parseUserName(email) {
      return email.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
    }
  }
})();