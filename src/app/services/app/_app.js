'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('App', AppService);

  AppService.$inject = ['Error', 'State'];

  function AppService(Error, State) {

    return {
      getErrorMessage: Error.getMessage,
      go: State.go,
      isAdminState: State.isAdmin,
      whenStateChanged: State.whenChanged
    };
  }

})();