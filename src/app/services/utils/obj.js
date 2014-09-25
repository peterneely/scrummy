'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Obj', ObjService);

  function ObjService() {

    return {
      has: has,
      isEmpty: isEmpty,
      merge: merge
    };

    function has(object, property){
      return _.has(object, property);
    }

    function isEmpty(item) {
      return _.isEmpty(item);
    }

    function merge(obj1, obj2){
      return _.merge(obj1, obj2);
    }
  }

})();