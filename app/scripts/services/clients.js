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

      var update = function (id, client) {
        return fb.$update(id, client);
      };

      return {
        clients: clients,
        add: add,
        remove: remove,
        update: update
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Clients', clientDataService);
})();