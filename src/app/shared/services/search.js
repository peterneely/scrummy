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

    function apply(key) {
      return _saved[key] || '';
    }

    function remove(key) {
      if (angular.isDefined(key)) {
        delete _saved[key];
      }
    }

    function save(key, value) {
      if (angular.isDefined(key)) {
        _saved[key] = value;
      }
    }
  }

})();