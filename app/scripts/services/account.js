'use strict';

(function () {

  var accountService = ['$q', '$firebase', 'URL',
    function ($q, $firebase, URL) {
      /*jshint camelcase: false */

      var ref = new Firebase(URL.firebase + 'users');
      var fb = $firebase(ref);

      var create = function (authUser) {
        var deferred = $q.defer();
        var user = {
          email: authUser.email,
          hash: authUser.md5_hash
        };
        var username = getUserName(authUser);
        fb.$set(username, user).then(function () {
          deferred.resolve(authUser);
        });
        return deferred.promise;
      };

      var getUser = function (authUser) {
        var deferred = $q.defer();
        var users = fb.$asArray();
        users.$loaded().then(function (data) {
          var username = getUserName(authUser);
          var user = data.$getRecord(username);
          deferred.resolve(user);
        });
        return deferred.promise;
      };

      function getUserName(authUser) {
        var dirty = authUser.email.split('@')[0];
        return dirty.replace(/[|&;$%@"<>()+,#.\[\]]/g, "");
      }

      var remove = function (id) {
        return fb.$remove(id);
      };

      var update = function (id, user) {
        return fb.$update(id, user);
      };

      return {
        create: create,
        getUser: getUser,
        remove: remove,
        update: update
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Account', accountService);
})();