'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('User', UserService);

  UserService.$inject = ['$filter', 'Async', 'Url', 'Resource'];

  function UserService($filter, Async, Url, Resource) {

    var _userName = null;

    return {
      cacheUserName: cacheUserName,
      clearUserName: clearUserName,
      create: create,
      get: get,
      updateState: updateState
    };

    function cacheUserName(userWithEmail) {
      return Async.promise(cache);

      function cache(deferred) {
        if (!Url.isUserNameCached()) {
          _userName = userWithEmail.email.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
          Url.cacheUserName(_userName);
        }
        deferred.resolve(userWithEmail);
      }
    }

    function clearUserName() {
      _userName = null;
      Url.cacheUserName(null);
    }

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
      var url = Url.userStateTimeType($filter('singular')(type));
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