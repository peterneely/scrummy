'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Firebase'];

  function ResourceService($firebase, Firebase) {

    return {
      delete: deleteResource,
      exists: exists,
      getAll: getAll,
      get: get,
      post: post,
      put: put,
      remove: remove,
      saveItem: saveItem,
      saveObject: saveObject,
      watch: watch
    };

    function deleteResource(url) {
      return resource(url).$remove();
    }

    function exists(item) {
      return item.$value !== null;
    }

    function getAll(url) {
      return resource(url).$asArray().$loaded();
    }

    function get(url) {
      return resource(url).$asObject().$loaded();
    }

    function post(url, data) {
      return resource(url).$push(data);
    }

    function put(url, data) {
      return resource(url).$update(data);
    }

    function remove(items, item) {
      return items.$remove(item);
    }

    function resource(url) {
      return $firebase(sdkResource(url));
    }

    function sdkResource(url) {
      return new Firebase(url);
    }

    function saveItem(items, item) {
      return items.$save(item);
    }

    function saveObject(item) {
      return item.$save();
    }

    function watch(data, callback) {
      data.$watch(function () {
        callback();
      });
    }
  }

})();