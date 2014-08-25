'use strict';

(function () {

  var manageController = ['User', 'Data', 'Location',
    function (User, Data, Location) {
      var self = this;

      self.new = null;
      self.search = { name: '' };

      User.whenLoggedIn(function () {
        self.all = Data.all(Location.data().url);
        self.placeholder = Location.data().placeholder;
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
    .controller('Manage', manageController);
})();