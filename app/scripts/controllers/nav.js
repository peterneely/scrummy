'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Nav', NavController);

  NavController.$inject = ['State', 'coreData'];

  function NavController(State, coreData) {

    var vm = this;

    vm.active = State.isActive();
    vm.picUrl = coreData.user.pic;
  }

})();