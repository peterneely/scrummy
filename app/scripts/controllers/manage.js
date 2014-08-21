'use strict';

(function () {

  var manageController = ['Clients', function (Clients) {

    var self = this;

    self.client = null;

    self.clients = [];

    Clients.clients.$loaded().then(function (data) {
      self.clients = data;
//      angular.forEach(data, function (value, key) {
//        if (key.substring(0, 1) !== '$') {
//          var client = {id: key, name: value.name};
//          console.log(client);
//          self.clients.push(client);
//        }
//      });
    });

    self.addClient = function () {
      Clients.add(self.client).then(resetClient);
    };

    function resetClient() {
      self.client = [];
    }
  }];

  angular
    .module('scrummyApp')
    .controller('Manage', manageController);
})();