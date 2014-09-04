'use strict';

(function () {
  var timeController = ['$modalInstance', 'coreData',
    function ($modalInstance, coreData) {

      var self = this;

      self.data = coreData;

      self.selected = {};

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