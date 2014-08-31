'use strict';

(function () {

  var dataService = ['$q', '$firebase', 'State', 'Url',
    function ($q, $firebase, State, Url) {

      var coreData = {
        user: {},
        clients: [],
        projects: [],
        tasks: []
      };

      var dataResource = function (user, type) {
        var url = Url.data(user.id, type);
        return resource(url);
      };

      var userResource = function (userName) {
        var url = Url.user(userName);
        return resource(url);
      };

      var add = function (object) {
        var resource = dataResource(coreData.user, type());
        return resource.$push(object);
      };

      var update = function (object) {
        return coreData[type()].$save(object);
      };

      var remove = function (object) {
        coreData[type()].$remove(object);
      };

      function resource(url){
        return $firebase(new Firebase(url));
      }

      function type(){
        return State.dataType();
      }

      return {
        coreData: coreData,
        dataResource: dataResource,
        userResource: userResource,
        add: add,
        update: update,
        remove: remove
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Data', dataService);
})();