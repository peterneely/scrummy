'use strict';

(function () {
  var timesheetController = ['$modal', 'viewData',
    function ($modal, viewData) {

      var self = this;

      self.open = function () {

        var config = {
          templateUrl: 'views/time.html',
          controller: 'Time as time',
          resolve: {
            viewData: function () {
              return viewData;
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