'use strict';

(function () {

  var manageController = ['Clients', function (Clients) {

    var self = this;

    self.client = null;

    self.clients = [];

    Clients.clients.$loaded().then(function (data) {
      self.clients = data;
      angular.forEach(data, function (value, key) {
        console.log(key, value);
//        if (key.substring(0, 1) !== '$') {
//          var client = {id: key, name: value.name};
//          console.log(client);
//          self.clients.push(client);
//        }
      });
    });

    self.add = function () {
      Clients.add(self.client).then(resetClient);
    };

    self.remove = function (id) {
      Clients.remove(id);
    };

    function resetClient() {
      self.client = [];
    }
  }];

  angular
    .module('scrummyApp')
    .controller('Manage', manageController);
})();