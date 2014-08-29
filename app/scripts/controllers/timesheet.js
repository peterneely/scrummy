'use strict';

(function () {
  var timesheetController = ['$modal', 'initialData',
    function ($modal, initialData) {

      var self = this;

      self.open = function () {

        var config = {
          templateUrl: 'views/time.html',
          controller: 'Time as time',
          resolve: {
            initialData: function () {
              return initialData;
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