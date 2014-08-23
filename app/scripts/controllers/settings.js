'use strict';

(function () {

  var settingsController = ['User', 'Clients', function (User, Clients) {

    var self = this;

    self.newClient = null;

    User.ready(function(){
      self.clients = Clients.all();
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