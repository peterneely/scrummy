'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Search', SearchService);

  function SearchService() {

    var _saved = {};

    return {
      apply: apply,
      remove: remove,
      save: save
    };

    function apply(key){
      return _saved[key] || '';
    }

    function remove(key){
      delete _saved[key];
    }

    function save(key, value){
      _saved[key] = value;
    }
  }

})();