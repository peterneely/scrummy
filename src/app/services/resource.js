'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Resource', ResourceService);

  ResourceService.$inject = ['$firebase', 'Config', 'Url'];

  function ResourceService($firebase, Config, Url) {

    // All public methods must be promises

    return {
      getAll: getAll,
      get: get,
      post: post,
      put: put,
      remove: remove,
      update: update,
      watch: watch,


      data: data,
      state: state,
      time: time
    };

    function getAll(urlFragments) {
      return ref(urlFragments).$asArray().$loaded();
    }

    function get(urlFragments) {
      return ref(urlFragments).$asObject().$loaded();
    }

    function post(urlFragments, data){
      return ref(urlFragments).$push(data);
    }

    function put(urlFragments, data) {
      return ref(urlFragments).$set(data);
    }

    function ref(urlFragments) {
      return resource(Url.path(urlFragments))
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

    function update(items, item){
      return items.$save(item);
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