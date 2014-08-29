'use strict';

(function () {

  var manageController = ['Location', 'Data', 'coreData',
    function (Location, Data, coreData) {
      var self = this;
      var type = Location.name();

      self.new = '';
      self.search = { name: '' };

      console.log(coreData[type]);
      self.items = coreData[type].resolved;

      self.placeholder = Location.placeholder();

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