'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('User', UserService);

  UserService.$inject = ['Config', 'Async', 'Data', 'Url', 'Resource'];

  function UserService(Config, Async, Data, Url, Resource) {

    var _email = null;
    var _userName = null;

    return {
      cacheUserName: cacheUserName,
      create: create,
      get: get,
      updateState: updateState
    };

    function cacheUserName(email) {
      _email = email;
      _userName = _email.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
      return Async.when(Url.cacheUserName(_userName));
    }

    function create(authUser) {
      return Async.promise(newUser);

      function newUser(deferred) {
        /*jshint camelcase: false */
        var user = {
          userName: _userName,
          email: _email,
          pic: Url.userPic(authUser.md5_hash)
        };
        Resource.put(Url.user, user).then(function () {
          deferred.resolve(user);
        });
      }
    }

    function get() {
      return Async.promise(user);

      function user(deferred) {
        Resource.get(Url.user).then(function (user) {
          deferred.resolve(user);
        });
      }
    }

    function updateState(type, text) {
      return Resource.put(Url.userStateTimeType(type), text);
    }
  }
})();