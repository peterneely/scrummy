'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('UserUtil', UserUtilService);

  UserUtilService.$inject = ['Async', 'Url'];

  function UserUtilService(Async, Url) {

    var _userName = null;

    return {
      cacheUserName: cacheUserName,
      clearUserName: clearUserName
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
  }

})();
