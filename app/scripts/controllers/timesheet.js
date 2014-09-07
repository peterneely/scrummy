'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Timesheet', TimesheetController);

  TimesheetController.$inject = ['$modal', 'viewData'];


  function TimesheetController($modal, viewData) {

    var vm = this;

    console.log(viewData);
    vm.open = onOpen;

    function onOpen() {
      var config = {
        templateUrl: 'views/time.html',
        controller: 'Time as time',
        resolve: {
          viewData: function () {
            return {
              user: viewData.user,
              clients: viewData.clients,
              projects: viewData.projects,
              tasks: viewData.tasks
            };
          }
        }
      };
      $modal.open(config);
    }
  }

})();