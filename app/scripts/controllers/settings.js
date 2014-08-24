'use strict';

(function () {

  var settingsController = ['$state', 'User', 'Data',
    function ($state, User, Data) {

      Data.is('clients');

      var self = this;

      self.newClient = null;

      User.whenLoggedIn(function () {
        self.clients = Data.all();

        self.show = true;

//        self.activeTab = function(tab){
//          return $state.current.data.selectedTab === tab ? 'active' : '';
//        };
      });

      self.add = function () {
        Data.add(self.newClient).then(resetClient);
      };

      self.remove = function (id) {
        Data.remove(id);
      };

      self.update = function (id, client) {
        Data.update(id, client);
      };

      function resetClient() {
        self.newClient = null;
      }
    }];

  angular
    .module('scrummyApp')
    .controller('Settings', settingsController);
})();