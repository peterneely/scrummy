'use strict';

(function(){
  var timeController = ['$modalInstance', function($modalInstance){
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
  }];

  angular
    .module('scrummyApp')
    .controller('Time', timeController);
})();