'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Admin', AdminController);

  AdminController.$inject = ['Fn', 'Resource', 'State', 'Time', 'Url', 'User', 'viewData'];

  function AdminController(Fn, Resource, State, Time, Url, User, viewData) {

    var _singleType = Fn.singular(viewData.type);

    var vm = this;
    vm.add = add;
    vm.hasTimes = hasTimes;
    vm.items = viewData.items;
    vm.new = '';
    vm.placeholder = Fn.singular(viewData.type);
    vm.remove = remove;
    vm.search = { name: '' };
    vm.searchId = State.current();
    vm.timesCount = timesCount;
    vm.update = update;

    function add() {
      Resource.post(Url[viewData.type](), vm.new).then(vm.new = '');
    }

    function hasTimes(item) {
      return item.times !== undefined;
    }

    function remove(item) {
      removeItem().then(removeUserState).then(removeTimes);

      function removeItem() {
        return Resource.remove(viewData.items, item);
      }

      function removeTimes() {
        return Time.removeTimes(_singleType, item.$id);
      }

      function removeUserState() {
        return User.removeState(_singleType, item.$id);
      }
    }

    function timesCount(item) {
      return Object.keys(item.times).length;
    }

    function update(item) {
      saveItem().then(updateUserState).then(updateTimes);

      function saveItem() {
        return Resource.saveItem(viewData.items, item);
      }

      function updateTimes() {
        return Time.updateTimes(_singleType, item.$id, item.name);
      }

      function updateUserState() {
        return User.updateState(_singleType, item.$id, item.name);
      }
    }
  }

})();