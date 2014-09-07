'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Timesheet', TimesheetController);

  TimesheetController.$inject = ['$modal', 'coreData'];


  function TimesheetController($modal, coreData) {

    var vm = this;

    vm.open = onOpen;

    function onOpen() {
      var config = {
        templateUrl: 'views/time.html',
        controller: 'Time as time',
        resolve: {
          coreData: function () {
            return coreData;
          }
        }
      };
      $modal.open(config);
    }
  }

})();