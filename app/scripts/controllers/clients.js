'use strict';

(function () {

  var clientsController = ['User', 'Data', function (User, Data) {
    var self = this;

    self.new = null;
    self.search = { name: '' };

    User.whenLoggedIn(function () {
      self.all = Data.all('clients');
      self.show = true;
    });

    self.add = function () {
      Data.add(self.new).then(self.new = null);
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
    .controller('Clients', clientsController);
})();