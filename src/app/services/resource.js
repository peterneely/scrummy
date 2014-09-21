'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config', 'Async'];

  function ResourceService($firebase, Config, Async) {

    return {
      exists: exists,
      getAll: getAll,
      get: get,
      post: post,
      put: put,
      remove: remove,
      updateArray: updateArray,
      updateObject: updateObject,
      watch: watch,


      data: data,
      state: state,
      time: time
    };

    function exists(item){
      return item.$value !== null;
    }

    function getAll(url) {
      return resource(url).$asArray().$loaded();
    }

    function get(url) {
      return resource(url).$asObject().$loaded();
    }

    function post(url, data){
      return resource(url).$push(data);
    }

    function put(url, data) {
      return resource(url).$update(data);
    }

    function remove(items, item){
      items.$remove(item);
    }

    function resource(url) {
      return $firebase(sdkResource(url));
    }

    function sdkResource(url) {
      return new Firebase(url);
    }

    function updateArray(items, item){
      return items.$save(item);
    }

    function updateObject(item){
      return item.$save();
    }

    function watch(data, callback) {
      data.$watch(function () {
        callback();
      });
    }




    function data(userName, type) {
      return resource(url(userName, type));
    }

    function state(userName, type) {
      return resource(url(userName, 'user/state/' + type));
    }


    function time(urlParts) {
      var location = 'times/' + urlParts.timeId + '/' + urlParts.type;
      return resource(url(urlParts.userName, location));
    }

    function url(userName, location) {
      var locationUrl = Config.urlData + userName + '/' + location;
      return locationUrl.replace('undefined', '');
    }
  }

})();