'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Account', AccountService);

  AccountService.$inject = ['$q', 'Data', '$filter'];

  function AccountService($q, Data, $filter) {

    return {
      createUser: createUser,
      getUser: getUser
    };

    function createUser(authUser) {
      /*jshint camelcase: false */

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
  }

})();