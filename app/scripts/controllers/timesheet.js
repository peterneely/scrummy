'use strict';

(function () {
  var timesheetController = ['$modal', 'FILE', function ($modal, FILE) {
    var self = this;

    self.open = function () {

      var config = {
        templateUrl: FILE.time,
        controller: 'Time as time'
      };

      var modalInstance = $modal.open(config);

      modalInstance.result.then(function () {

      });
    };
  }];

  angular
    .module('scrummyApp')
    .controller('Timesheet', timesheetController);
})();