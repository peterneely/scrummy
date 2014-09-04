'use strict';

(function () {
  var timeController = ['$modalInstance', 'coreData',
    function ($modalInstance, coreData) {

      var self = this;

      function list(items){
        var array = [];
        angular.forEach(items, function(item){
          array.push({
            id: item.$id,
            text: item.name
          });
        });
        return _.sortBy(array, 'text');
      }

      self.selected = {};

      self.clients = {
        data: list(coreData.clients),
        placeholder: 'Select a client',
        tokenSeparators: [',', ' ']
      };

      self.projects = list(coreData.projects);
      self.tasks = list(coreData.tasks);

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