'use strict';

(function () {
  var timeController = ['$filter', '$modalInstance', 'coreData',
    function ($filter, $modalInstance, coreData) {

      var self = this;

      self.data = coreData;

      self.state = {};

      self.formatTime = function(field){
        self.state[field] = $filter('date')(self.state[field], 'HH:mm');
        console.log(self.state[field]);
      };

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