'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('User', UserService);

  UserService.$inject = ['Async', 'Fn', 'Resource', 'Url', 'UserAuth', 'UserUtil'];

  function UserService(Async, Fn, Resource, Url, UserAuth, UserUtil) {

    var _userName = null;

    return {
      cacheUserName: UserUtil.cacheUserName,
      clearUserName: UserUtil.clearUserName,
      create: create,
      get: get,
      getAuthStatus: UserAuth.getAuthStatus,
      getAuthUser: UserAuth.get,
      login: UserAuth.login,
      logout: UserAuth.logout,
      register: UserAuth.register,
      updateState: updateState
    };

    function create(authUser) {
      return Async.promise(newUser);

      function newUser(deferred) {
        /*jshint camelcase: false */
        var user = {
          userName: _userName,
          email: authUser.email,
          pic: Url.userPic(authUser.md5_hash)
        };
        Resource.put(Url.user(), user).then(function () {
          deferred.resolve(user);
        });
      }
    }

    function get() {
      return Async.promise(user);

      function user(deferred) {
        Resource.get(Url.user()).then(function (user) {
          deferred.resolve(user);
        });
      }
    }

    function updateState(type, text) {
      var url = Url.userStateTimeType(Fn.singular(type));
      return Resource.get(url).then(update);

      function update(time) {
        if (Resource.exists(time)) {
          time.text = text;
          Resource.saveObject(time);
        }
      }
    }
  }

})();