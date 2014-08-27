'use strict';

(function () {

  var manageController = ['User', 'Data', 'Location', 'Clients',
    function (User, Data, Location, Clients) {
      var self = this;

      self.new = '';
      self.search = { name: '' };

      User.whenLoggedIn(function () {
        self.all = Clients.clients();// Data.all();
        self.placeholder = Location.placeholder();
        self.show = true;
      });

      self.add = function () {
        Data.add(self.new).then(self.new = '');
      };

      self.remove = function (client) {
        Data.remove(client);
      };

      self.update = function (client) {
        Data.update(client);
      };

      self.searching = function () {
        return self.search.name.length > 0;
      };

      self.clearSearch = function () {
        self.search.name = '';
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Manage', manageController);
})();