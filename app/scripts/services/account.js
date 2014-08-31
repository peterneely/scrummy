'use strict';

(function () {

  var accountService = ['$q', '$firebase', 'Auth', 'State', 'Url',
    function ($q, $firebase, Auth, State, Url) {
      /*jshint camelcase: false */

      var _users = $firebase(new Firebase(URL.firebase + 'users'));
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
        var userName = getUserName(authUser);
        var url = Url.user(userName);
        var user = $firebase(new Firebase(url));
        user.$asObject().$loaded().then(function (user) {
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
          return URL.avatar + userId + defaultPic;
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