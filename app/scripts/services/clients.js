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

      return {
        clients: clients,
        add: add
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Clients', clientDataService);
})();