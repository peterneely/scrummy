'use strict';

(function () {

  var accountService = ['$q', '$firebase', 'Auth', 'Location', 'URL',
    function ($q, $firebase, Auth, Location, URL) {
      /*jshint camelcase: false */

      var users = $firebase(new Firebase(URL.firebase));
      var path = 'account';

      var createUser = function (authUser) {
        var deferred = $q.defer();
        var user = {
          email: authUser.email,
          hash: authUser.md5_hash
        };
        var location = getUserName(authUser) + path;
        users.$set(location, user).then(function () {
          deferred.resolve(authUser);
        });
        return deferred.promise;
      };

      var getUser = function (authUser) {
        var deferred = $q.defer();
        var usersArray = users.$asArray();
        usersArray.$loaded().then(function (array) {
          var key = getUserName(authUser);
          var user = array.$getRecord(key)[path];
          var currentUser = {
            id: key,
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
        createUser: createUser,
        getUser: getUser
//        remove: remove,
//        update: update
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Account', accountService);
})();