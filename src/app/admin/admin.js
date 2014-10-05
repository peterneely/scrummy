'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Admin', AdminController);

  AdminController.$inject = ['AdminTimes', 'Device', 'Fn', 'Resource', 'State', 'Time', 'Url', 'User', 'viewData'];

  function AdminController(AdminTimes, Device, Fn, Resource, State, Time, Url, User, viewData) {

    var _singleType = Fn.singular(viewData.type);
    var _times = AdminTimes.timesByType(_singleType, viewData.times);

    var vm = this;
    vm.add = add;
    vm.canFocus = !Device.isPortable();
    vm.hasTimes = hasTimes;
    vm.items = viewData.items;
    vm.new = '';
    vm.placeholder = _singleType;
    vm.remove = remove;
    vm.search = { name: '' };
    vm.searchId = State.current();
    vm.searchTimes = searchTimes;
    vm.timesCount = timesCount;
    vm.update = update;

    function add() {
      Resource.post(Url[viewData.type](), vm.new).then(vm.new = '');
    }

    function hasTimes(item) {
      return angular.isDefined(_times[item.$id]);
    }

    function remove(item) {
      if(hasTimes(item)){
        confirm().then(response);
      } else {
        removeNow();
      }

      function confirm(){
        return AdminTimes.confirmRemove(item);
      }

      function removeNow(){
        AdminTimes.clearSearch();
        removeItem().then(removeUserState).then(removeTimes);
      }

      function removeItem() {
        return Resource.remove(viewData.items, item);
      }

      function removeTimes() {
        return Time.removeTimes(_singleType, item.$id);
      }

      function removeUserState() {
        return User.removeState(_singleType, item.$id);
      }

      function response(selected){
        switch(selected){
          case 'show':
            searchTimes(item);
            break;
          case 'remove':
            removeNow();
            break;
        }
      }
    }

    function searchTimes(item) {
      AdminTimes.search = {
        id: item.$id,
        text: item.name
      };
      State.go('nav.times');
    }

    function timesCount(item) {
      var times = _times[item.$id] || [];
      return times.length;
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