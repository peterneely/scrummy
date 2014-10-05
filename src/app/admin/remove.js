'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('AdminRemove', AdminRemoveController);

  AdminRemoveController.$inject = ['$modalInstance', 'viewData'];

  function AdminRemoveController($modalInstance, viewData) {

    var vm = this;
    vm.cancel = cancel;
    vm.name = viewData.name;
    vm.remove = remove;
    vm.show = show;

    function cancel() {
      $modalInstance.dismiss();
    }

    function remove() {
      $modalInstance.close('remove');
    }

    function show(){
      $modalInstance.close('show');
    }
  }

})();