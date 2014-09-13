'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Timesheet', TimesheetController);

  TimesheetController.$inject = ['$modal', 'Time', 'viewData'];


  function TimesheetController($modal, Time, viewData) {

    var vm = this;
    vm.times = groupTimes();
    vm.open = onOpen;

    Time.onUpdated(function () {
      vm.times = groupTimes();
    });

    function groupTimes() {
      return Time.group(viewData.times);
    }

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