'use strict';

(function () {
  var timeController = ['$modalInstance', 'Data', function ($modalInstance, Data) {
    var self = this;

    var clientsCache = null;

    self.selectedClient = null;

    self.clients = function(){
      return clientsCache ? clientsCache : list('clients');
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
        console.log(list);
        console.log('got data');
        clientsCache = list;
        return list;
      });
    }

    self.filterClients = function(value){
      console.log(clientsCache.length);
      if(clientsCache.length > 0) {
        console.log(clientsCache);
        var result = clientsCache.filter(function (client){
          console.log(client);
          return client.name.indexOf(value) > -1;
        });
//      var filtered = _.filter(clientsCache, function(client){
//        console.log(client, value, client.name.indexOf(value));
//        return client.name.indexOf(value) > -1;
//      });
//      console.log(filtered);
        return result;
      }

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