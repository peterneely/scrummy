'use strict';

(function () {

  var manageController = ['User', 'Data', 'Location',
    function (User, Data, Location) {
      var self = this;
      var type = Location.name();

      self.new = '';
      self.search = { name: '' };

      User.whenLoggedIn(function () {
        self.all = Data.all(type);
        self.placeholder = Location.placeholder();
        self.show = true;
      });

      self.add = function () {
        Data.add(type, self.new).then(self.new = '');
      };

      self.remove = function (object) {
        Data.remove(type, object);
      };

      self.update = function (object) {
        Data.update(type, object);
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