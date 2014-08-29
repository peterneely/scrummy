'use strict';

(function () {

  var accountService = ['$q', '$firebase', 'Auth', 'Location', 'URL',
    function ($q, $firebase, Auth, Location, URL) {
      /*jshint camelcase: false */

      var _users = $firebase(new Firebase(URL.firebase));
      var _location = 'account';

      var createUserPromise = function (authUser) {
        var deferred = $q.defer();
        var user = {
          email: authUser.email,
          hash: authUser.md5_hash
        };
        var resource = getUserName(authUser) + _location;
        _users.$set(resource, user).then(function () {
          deferred.resolve(authUser);
        });
        return deferred.promise;
      };

      var getUserPromise = function (authUser) {
        var deferred = $q.defer();
        _users.$asArray().$loaded().then(function (data) {
          var userName = getUserName(authUser);
          var user = data.$getRecord(userName)[_location];
          var currentUser = {
            id: userName,
            email: user.email,
            hash: user.hash
          };
          deferred.resolve(currentUser);
        });
        return deferred.promise;
      };

      function getUserName(authUser) {
        var userName = authUser.email.split('@')[0];
        return userName.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
      }

//      var remove = function (id) {
//        return users.$remove(id);
//      };
//
//      var update = function (id, user) {
//        return users.$update(id, user);
//      };

      return {
        createUser: createUserPromise,
        getAccountUser: getUserPromise
//        remove: remove,
//        update: update
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Account', accountService);
})();