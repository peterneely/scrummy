'use strict';

(function () {
  var timeController = ['$modalInstance', 'coreData', function ($modalInstance, coreData) {
    var self = this;

    self.selected = {
      client: null,
      project: null,
      task: null
    };

    self.clients = function () {
      return coreData.clients.resolved;
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