'use strict';

(function () {

  var clientsService = ['$q', '$firebase', '$state', 'URL', 'User',
    function ($q, $firebase, $state, URL, User) {

      var clients = null;

      var clientsPromise = function () {
        var deferred = $q.defer();

        if (clients === null) {
          var dataPromise = getData('/clients').$asArray();
          dataPromise.$loaded().then(function (data) {
            clients = data;
            console.log(clients);
            deferred.resolve(clients);
          });
        } else {
          deferred.resolve(clients);
        }

        return deferred.promise;
      };

      function getData(dataUrl) {
        var currentUser = User.getCurrentUser();
        var url = URL.firebase + currentUser.id + dataUrl;
        return $firebase(new Firebase(url));
      }

      return {
        clients: function(){
          return clients;
        },
        clientsPromise: clientsPromise
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Clients', clientsService);
})();