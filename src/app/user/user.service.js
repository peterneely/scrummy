'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('User', UserService);

  UserService.$inject = ['Config', 'Url', 'Resource', 'Async'];

  function UserService(Config, Url, Resource, Async) {

    var _user = {};

    return {
      create: create,
      get: get
    };

    function create(authUser) {
      return Async.promise(newUser);

      function newUser(deferred) {
        var user = createUser();
        persistUser(user);

        function createUser() {
          /*jshint camelcase: false */
          var email = authUser.email;
          var userName = parseUserName(email);
          return {
            userName: userName,
            email: email,
            pic: Config.urlPic + authUser.md5_hash + '?d=mm'
          };
        }

        function persistUser(user) {
          Url.root(user.userName);
          Resource.put(Url.user(), user).then(function () {
            _user = user;
            deferred.resolve(user);
          });
        }
      }
    }

    function get(authUser) {
      return Async.promise(user);

      function user(deferred) {
        if (!_.isEmpty(_user)) {
          deferred.resolve(_user);
        } else {
          var userName = parseUserName(authUser.email);
          Url.cacheUserName(userName);
          Resource.getUser().then(function (user) {
            _user = user;
            deferred.resolve(user);
          });
        }
      }
    }

    function parseUserName(email) {
      return email.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
    }
  }
})();