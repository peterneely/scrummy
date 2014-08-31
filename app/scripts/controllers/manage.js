'use strict';

(function () {

  var manageController = ['Data', 'viewData2', function (Data, viewData2) {

    var self = this;

    self.new = '';
    self.search = { name: '' };

    self.items = viewData2.items;

    self.placeholder = viewData2.type.slice(0, -1);

    self.add = function () {
      Data.add(self.new, viewData2.user, viewData2.type).then(self.new = '');
    };

    self.remove = function (object) {
      Data.remove(object, viewData2.items);
    };

    self.update = function (object) {
      Data.update(object, viewData2.items);
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