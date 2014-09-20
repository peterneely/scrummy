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
      Async.task(function (deferred) {
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
          Resource.put(Url.user, user).then(function () {
            _user = user;
            deferred.resolve(user);
          });
        }
      });
    }

    function get(authUser) {
      console.log('ok');
      Async.task(function (deferred) {

        if (isCached()) {
          getFromCache();
        } else {
          getFromStore();
        }

        function getFromCache() {
          deferred.resolve(_user);
        }

        function getFromStore() {
          var userName = parseUserName(authUser.email);
          Url.root(userName);
          Resource.getUser().then(function (user) {
            _user = user;
            deferred.resolve(user);
          });
        }

        function isCached() {
          return !_.isEmpty(_user);
        }
      });
    }

    function parseUserName(email) {
      return email.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
    }
  }
})();