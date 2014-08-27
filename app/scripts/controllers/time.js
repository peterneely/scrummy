'use strict';

(function () {
  var timeController = ['$modalInstance', 'Data', function ($modalInstance, Data) {
    var self = this;
    var menu = {};

    self.selected = null;

    self.clients = function(){
      return menu.clients ? menu.clients : loadMenu('clients');
    };

    function loadMenu(type){
      dataFor(type).then(function(data){
        return data;
      }).then(function(data){
        console.log(data);
        var menu = menuFrom(data);
        console.log(menu);
        var sorted = sortMenu(menu);
        return menu.clients = sorted;
      });
    }

    function dataFor(type){
      return Data.all(type).$loaded();
    }

    function menuFrom(data){
      var list = [];
      angular.forEach(data, function(value, key){
        if(key.indexOf('-') === 0) {
          list.push({id: key, name: value['name']});
        }
      });
      return list;
    }

    function sortMenu(menu){
      return _.sortBy(menu, 'name');
    }

    self.filter = function(type, value){
      console.log(type, value);
      loadMenu(type);
      var items = menu[type];
      if(items) {
        var filtered = items.filter(function (item){
          return item.name.indexOf(value) > -1;
        });
        console.log(filtered);
        return filtered;
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