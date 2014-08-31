'use strict';

(function () {
  var timeController = ['$modalInstance', 'viewData',
    function ($modalInstance, viewData) {

      var self = this;

      self.selected = {
        client: null,
        project: null,
        task: null
      };

      self.clients = function () {
        return viewData.clients;
      };

      self.ok = function () {
        $modalInstance.close();
      };

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Time', timeController);
})();