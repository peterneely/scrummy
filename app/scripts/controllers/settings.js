'use strict';

(function () {

  var settingsController = ['Clients', function (Clients) {

    var self = this;

    self.newClient = null;

    self.clients = null;

    Clients.all().$loaded().then(function (data) {
      self.clients = data;
    });

    self.add = function () {
      Clients.add(self.newClient).then(resetClient);
    };

    self.remove = function (id) {
      Clients.remove(id);
    };

    self.update = function (id, client) {
      Clients.update(id, client);
    };

    function resetClient() {
      self.newClient = null;
    }
  }];

  angular
    .module('scrummyApp')
    .controller('Settings', settingsController);
})();