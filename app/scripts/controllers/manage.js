'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Manage', ManageController);

  ManageController.$inject = ['Data', '$filter', 'viewData'];

  function ManageController(Data, $filter, viewData) {

    var vm = this;

    vm.add = add;
    vm.clearSearch = clearSearch;
    vm.hasTimes = hasTimes;
    vm.items = viewData.items;
    vm.new = '';
    vm.placeholder = $filter('singular')(viewData.type);
    vm.remove = remove;
    vm.search = { name: '' };
    vm.searching = searching;
    vm.timesCount = timesCount;
    vm.update = update;

    function add() {
      Data.add(vm.new, viewData.user, 'groups/' + viewData.type).then(vm.new = '');
    }

    function clearSearch() {
      vm.search.name = '';
    }

    function hasTimes(item) {
      return item.times !== undefined;
    }

    function remove(item) {
      Data.remove(item, viewData);
    }

    function searching() {
      return vm.search.name.length > 0;
    }

    function timesCount(item) {
      return Object.keys(item.times).length;
    }

    function update(item) {
      Data.update(item, viewData);
    }
  }
})();