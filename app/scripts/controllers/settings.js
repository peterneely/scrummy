'use strict';

(function () {

  var settingsController = ['User', 'Data', function (User, Data) {
      var self = this;

      self.newClient = null;

      User.whenLoggedIn(function () {
        self.clients = Data.all('clients');
        self.show = true;
      });

      self.add = function () {
        Data.add(self.newClient).then(resetClient);
      };

      self.remove = function (client) {
        Data.remove(client);
      };

      self.update = function (client) {
        Data.update(client);
      };

      function resetClient() {
        self.newClient = null;
      }
    }];

  angular
    .module('scrummyApp')
    .controller('Settings', settingsController);
})();