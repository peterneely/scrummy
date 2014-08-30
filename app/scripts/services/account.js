'use strict';

(function () {

  var accountService = ['$q', '$firebase', 'Auth', 'Location', 'URL',
    function ($q, $firebase, Auth, Location, URL) {
      /*jshint camelcase: false */

      var _users = $firebase(new Firebase(URL.firebase));
      var _location = 'account';

      var createUser = function (authUser) {
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

      var getAccountUser = function (authUser) {
        var deferred = $q.defer();
        _users.$asArray().$loaded().then(function (data) {
          var userName = getUserName(authUser);
          var user = data.$getRecord(userName)[_location];
          var currentUser = {
            id: userName,
            email: user.email,
            pic: picUrl(user)
          };
          deferred.resolve(currentUser);
        });
        return deferred.promise;
      };

      function getUserName(authUser) {
        var userName = authUser.email.split('@')[0];
        return userName.replace(/[|&;$%@"<>()+,#.\[\]]/g, '');
      }

      function picUrl(user) {
        // API at https://en.gravatar.com/site/implement/images/
        if (user) {
          var userId = user.hash;
          var defaultPic = '?d=mm';
          return URL.gravatar + userId + defaultPic;
        }
      }

      return {
        createUser: createUser,
        getAccountUser: getAccountUser
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Account', accountService);
})();