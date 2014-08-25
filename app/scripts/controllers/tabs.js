'use strict';

(function () {

  var tabsController = ['User', 'Data', function (User, Data) {
    var self = this;

  }];

  angular
    .module('scrummyApp')
    .controller('Tabs', tabsController);
})();