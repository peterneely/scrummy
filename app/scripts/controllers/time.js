'use strict';

(function () {
  var timeController = ['$modalInstance', 'Data', function ($modalInstance, Data) {
    var self = this;

    self.selected = {
      client: null,
      project: null,
      task: null
    };

    self.clients = function(){
      console.log(Data.all('clients'));
      return Data.all('clients');
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