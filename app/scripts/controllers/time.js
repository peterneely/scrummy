'use strict';

(function () {
  var timeController = ['$modalInstance', 'Data', function ($modalInstance, Data) {
    var self = this;

    var clientsCache = null;

    self.selectedClient = null;

    self.clients = function(){
      return clientsCache ? clientsCache : clientsCache = list('clients');
    };

    function list(type){
      return Data.all(type).$loaded().then(function(data){
        var list = [];
        angular.forEach(data, function(value, key){
          if(key.indexOf('-') === 0) {
            list.push({id: key, name: value['name']});
          }
        });
        list = _.sortBy(list, 'name');
        return list;
      });
    }

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