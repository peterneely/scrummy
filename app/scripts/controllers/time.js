'use strict';

(function () {
  var timeController = ['$modalInstance', 'coreData',
    function ($modalInstance, coreData) {

      var self = this;

      self.data = coreData;

      self.state = {};

      self.ok = function () {
        $modalInstance.close();
        console.log(self.state);
      };

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Time', timeController);
})();