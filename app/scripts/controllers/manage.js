'use strict';

(function () {

  var manageController = ['State', 'Data', 'initialData',
    function (State, Data, initialData) {

      var self = this;
      self.new = '';
      self.search = { name: '' };
      var context = {
        user: initialData.data.user,
        dataType: State.dataType()
      };

      self.items = initialData.data[type];

      self.placeholder = State.placeholder();

      self.add = function () {
        Data.add(self.new, context).then(self.new = '');
      };

      self.remove = function (object) {
        Data.remove(object, context);
      };

      self.update = function (object) {
        Data.update(object, context);
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