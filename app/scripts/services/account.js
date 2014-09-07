'use strict';

(function () {

  var accountService = ['$q', 'Data', '$filter', 'Url',
    function ($q, Data, $filter, Url) {
      /*jshint camelcase: false */

      return {
        createUser: createUser,
        getUser: getUser
      };

      function createUser(authUser) {
        var deferred = $q.defer();
        var user = {
          email: authUser.email,
          hash: authUser.md5_hash
        };
        var userName = $filter('userNameFromEmail')(authUser.email);
        var userResource = Data.userResource(userName);
        userResource.$set(user).then(function () {
          deferred.resolve(authUser);
        });
        return deferred.promise;
      }

      function getUser(authUser) {
        var deferred = $q.defer();
        var userName = $filter('userNameFromEmail')(authUser.email);
        var userResource = Data.userResource(userName);
        userResource.$asObject().$loaded().then(function (user) {
          var currentUser = {
            id: userName,
            email: user.email,
            pic: picUrl(user)
          };
          deferred.resolve(currentUser);
        });
        return deferred.promise;

        function picUrl(user) {
          // API at https://en.gravatar.com/site/implement/images/
          if (user) {
            var userId = user.hash;
            var defaultPic = '?d=mm';
            return Url.rootAvatar + '/' + userId + defaultPic;
          }
        }
      }
    }];

  angular
    .module('scrummyApp')
    .factory('Account', accountService);
})();