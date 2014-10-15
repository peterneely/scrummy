'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('User', UserService);

  UserService.$inject = ['Async', 'Resource', 'Url', 'UserAuth', 'UserUtil'];

  function UserService(Async, Resource, Url, UserAuth, UserUtil) {

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
      removeState: removeState,
      updateState: updateState
    };

    function create(authUser, form) {
      return Async.promise(newUser);

      function newUser(deferred) {
        /*jshint camelcase: false */
        var user = {
          userName: UserUtil.getCachedUserName(),
          email: authUser.email,
          pic: Url.userPic(authUser.md5_hash)
        };
        Resource.put(Url.user(), user).then(function () {
          deferred.resolve(form);
        });
      }
    }

    function findState(type, id, callback) {
      var url = Url.userStateTimeType(type);
      return Resource.get(url).then(action);

      function action(time) {
        if (Resource.exists(time) && time.id === id) {
          callback(url, time);
        }
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

    function removeState(type, id) {
      return findState(type, id, remove);

      function remove(url) {
        Resource.deleteResource(url);
      }
    }

    function updateState(type, id, text) {
      return findState(type, id, update);

      function update(url, time) {
        time.text = text;
        Resource.saveObject(time);
      }
    }
  }

})();
