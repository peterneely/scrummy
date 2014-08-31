'use strict';

(function () {

  var accountService = ['$q', 'Auth', 'State', 'Data',
    function ($q, Auth, State, Data) {
      /*jshint camelcase: false */

      var createUser = function (authUser) {
        var deferred = $q.defer();
        var user = {
          email: authUser.email,
          hash: authUser.md5_hash
        };
        var userName = getUserName(authUser);
        var users = Data.userResource(userName);
        users.$set('account', user).then(function () {
          deferred.resolve(authUser);
        });
        return deferred.promise;
      };

      var getUser = function (authUser) {
        var deferred = $q.defer();
        var userName = getUserName(authUser);
        var user = Data.userResource(userName);
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
        getUser: getUser
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Account', accountService);
})();