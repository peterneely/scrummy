'use strict';

(function () {

  var location = ['$location', '$state', 'URL',
    function ($location, $state, URL) {

      var urlFor = function (page) {
        return '#' + URL[page];
      };

      var go = function (page) {
        $location.path(URL[page]);
      };

      var isActive = function () {
        var activeStates = ['root.clients', 'root.projects', 'root.tasks'];
        var isActive = _.contains(activeStates, currentState());
        return isActive ? 'active' : '';
      };

      var name = function(){
        return currentState();
      };

      var placeholder = function () {
        return currentState().slice(0, -1);
      };

      var onLogout = function () {
        go('home');
      };

      function currentState() {
        return $state.current.name.replace('root.', '');
      }

      return {
        urlFor: urlFor,
        go: go,
        isActive: isActive,
        name: name,
        placeholder: placeholder,
        onLogout: onLogout
      };
    }];

  angular
    .module('scrummyApp')
    .factory('Location', location);
})();