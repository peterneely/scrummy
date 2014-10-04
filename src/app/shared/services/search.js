'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Search', SearchService);

  function SearchService() {

    var _saved = {};

    return {
      save: save,
      apply: apply
    };

    function save(key, value){
      _saved[key] = value;
    }

    function apply(key){
      return _saved[key] || '';
    }
  }

})();