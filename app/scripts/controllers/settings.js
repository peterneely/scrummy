'use strict';

(function () {

  var settingsController = ['Clients', 'User', function (Clients, User) {

    var self = this;

    self.newClient = null;

    self.clients = null;

    Clients.all.$loaded().then(function (data) {
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

    Clients.init(User.getCurrentUser(), 'clients');
  }];

  angular
    .module('scrummyApp')
    .controller('Settings', settingsController);
})();