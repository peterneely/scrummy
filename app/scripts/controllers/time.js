'use strict';

(function(){
  var timeController = ['$modalInstance', 'Data', function($modalInstance, Data){
    var self = this;

    self.selected = {
      item: ''
    };

    self.ok = function(){
      $modalInstance.close();
    };

    self.cancel = function(){
      $modalInstance.dismiss('cancel');
    };

    self.selectedClient = '';

    self.clients = Data.all(Location.data().url);
  }];

  angular
    .module('scrummyApp')
    .controller('Time', timeController);
})();