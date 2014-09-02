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
            name: item.name
          });
        });
        return array;
      }

      self.selected = {};

      console.log(coreData.projects, list(coreData.projects));

      self.clients = list(coreData.clients);
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