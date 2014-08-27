'use strict';

(function () {
  var timesheetController = ['$modal', function ($modal) {
    var self = this;

    self.open = function () {

      var config = {
        templateUrl: 'views/time.html',
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