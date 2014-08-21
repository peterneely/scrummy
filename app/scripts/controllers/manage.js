'use strict';

(function () {

  var manageController = function () {

    var self = this;

    self.addClient = function (client) {
      alert(client);
    };
  };

  angular
    .module('scrummyApp')
    .controller('Manage', manageController);
})();