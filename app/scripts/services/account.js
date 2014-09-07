'use strict';

(function () {

  var accountService = ['$q', 'Data', '$filter', function ($q, Data, $filter) {
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
      var userName = $filter('userName')(authUser.email);
      var userResource = Data.userResource(userName);
      userResource.$set(user).then(function () {
        deferred.resolve(authUser);
      });
      return deferred.promise;
    }

    function getUser(authUser) {
      var deferred = $q.defer();
      var userName = $filter('userName')(authUser.email);
      var userResource = Data.userResource(userName);
      userResource.$asObject().$loaded().then(function (user) {
        var currentUser = {
          id: userName,
          email: user.email,
          pic: $filter('urlPic')(user)
        };
        deferred.resolve(currentUser);
      });
      return deferred.promise;
    }
  }];

  angular
    .module('scrummyApp')
    .factory('Account', accountService);
})();