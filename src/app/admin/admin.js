'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Admin', AdminController);

  AdminController.$inject = ['Fn', 'Resource', 'Time', 'Url', 'User', 'viewData'];

  function AdminController(Fn, Resource, Time, Url, User, viewData) {

    var vm = this;

    vm.add = add;
    vm.clearSearch = clearSearch;
    vm.hasTimes = hasTimes;
    vm.items = viewData.items;
    vm.new = '';
    vm.placeholder = Fn.singular(viewData.type);
    vm.remove = remove;
    vm.search = { name: '' };
    vm.searching = searching;
    vm.timesCount = timesCount;
    vm.update = update;

    function add() {
      Resource.post(Url[viewData.type](), vm.new).then(vm.new = '');
    }

    function clearSearch() {
      vm.search.name = '';
    }

    function hasTimes(item) {
      return item.times !== undefined;
    }

    function remove(item) {
      Resource.remove(viewData.items, item);
    }

    function searching() {
      return vm.search.name.length > 0;
    }

    function timesCount(item) {
      return Object.keys(item.times).length;
    }

    function update(item) {
      Resource.saveItem(viewData.items, item)
        .then(updateUserState)
        .then(updateTimes);

      function updateUserState(){
        return User.updateState(viewData.type, item.name);
      }

      function updateTimes(){
        return Time.updateTimes(viewData.type, item.$id, item.name);
      }
    }
  }

})();