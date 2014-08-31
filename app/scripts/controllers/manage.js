'use strict';

(function () {

  var manageController = ['State', '$state', 'Data', 'initialData',
    function (State, $state, Data, initialData) {

      var self = this;

      self.new = '';
      self.search = { name: '' };

      self.items = initialData[State.dataType()];

      self.placeholder = State.placeholder();

      self.add = function () {
        Data.add(self.new).then(self.new = '');
      };

      self.remove = function (object) {
        Data.remove(object);
      };

      self.update = function (object) {
        Data.update(object);
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