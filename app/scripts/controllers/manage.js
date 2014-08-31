'use strict';

(function () {

  var manageController = ['Data', 'viewData', function (Data, viewData) {

    var self = this;

    self.new = '';
    self.search = { name: '' };

    self.items = viewData.items;

    self.placeholder = viewData.type.slice(0, -1);

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