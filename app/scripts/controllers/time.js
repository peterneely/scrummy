'use strict';

(function () {
  var timeController = ['$modalInstance', 'initialData',
    function ($modalInstance, initialData) {

      var self = this;

      self.selected = {
        client: null,
        project: null,
        task: null
      };

      self.clients = function () {
        return initialData.clients;
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