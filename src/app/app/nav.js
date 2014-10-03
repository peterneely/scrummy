'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Nav', NavController);

  NavController.$inject = ['State', 'coreData'];

  function NavController(State, coreData) {

    var vm = this;
    vm.class = '';
    vm.defaultAdminState = defaultAdminState;
    vm.picUrl = coreData.user.pic;

    State.whenChanged(function (stateName) {
      var isAdmin = State.isAdmin(stateName);
      isAdminActive();
      saveAdminState();

      function isAdminActive() {
        vm.class = isAdmin ? 'active' : '';
      }

      function saveAdminState() {
        if (isAdmin) {
          State.saveDefaultAdmin();
        }
      }
    });

    function defaultAdminState() {
      State.getDefaultAdmin().then(function (state) {
        State.go(state);
      });
    }
  }

})();