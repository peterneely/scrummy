'use strict';

(function () {
  var timesheetController = ['$modal', 'coreData', function ($modal, coreData) {
    var self = this;

    console.log(coreData);
    self.open = function () {

      var config = {
        templateUrl: 'views/time.html',
        controller: 'Time as time',
        resolve: {
          coreData: function () {
            return coreData;
          }
        }
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