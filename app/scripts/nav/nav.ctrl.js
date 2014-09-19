'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Nav', NavController);

  NavController.$inject = ['State', 'coreData'];

  function NavController(State, coreData) {

    var vm = this;
    vm.picUrl = coreData.user.pic;

    State.whenChanged(function (stateName) {
      vm.class = State.tabActive(stateName) ? 'active' : '';
    });
  }

})();