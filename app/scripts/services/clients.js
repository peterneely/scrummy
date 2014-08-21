'use strict';

(function () {

  var clientDataService = ['$firebase', 'URL',
    function ($firebase, URL) {

      var ref = new Firebase(URL.firebase + 'clients');
      var fb = $firebase(ref);

      var clients = fb.$asObject();

      var add = function (client) {
        return fb.$push(client);
      };

      var remove = function (id) {
        return fb.$remove(id);
      };

      return {
        clients: clients,
        add: add,
        remove: remove
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Clients', clientDataService);
})();