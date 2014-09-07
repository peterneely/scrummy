'use strict';

(function () {

  var manageController = ['Data', '$filter', 'viewData',
    function (Data, $filter, viewData) {

      var self = this;

      self.new = '';
      self.search = { name: '' };

      self.items = viewData.items;

      self.placeholder = $filter('singular')(viewData.type);

      self.add = function () {
        Data.add(self.new, viewData.user, viewData.type).then(self.new = '');
      };

      self.remove = function (object) {
        Data.remove(object, viewData.items);
      };

      self.update = function (object) {
        Data.update(object, viewData.items);
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