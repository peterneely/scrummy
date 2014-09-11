'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Nav', NavController);

  NavController.$inject = ['$rootScope', 'State', 'coreData'];

  function NavController($rootScope, State, coreData) {

    var vm = this;

    $rootScope.$on('isManage', function (event, data) {
      vm.active = data;
    });

    vm.active = '';
    vm.picUrl = coreData.user.pic;
  }

})();