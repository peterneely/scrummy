'use strict';

(function () {
  var timeController = ['$modalInstance', 'Data', 'coreData',
    function ($modalInstance, Data, coreData) {

      var self = this;

      self.data = coreData;

      self.state = {};

      self.start = function () {
        $modalInstance.close();
        Data.startTimer(self.state);
      };

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }];

  angular
    .module('scrummyApp')
    .controller('Time', timeController);
})();