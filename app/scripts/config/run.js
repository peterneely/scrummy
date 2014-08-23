'use strict';

(function () {

  var bootstrap = ['Start', function (Start) {
    Start.getUser();
  }];

  angular
    .module('scrummyApp')
    .run(bootstrap);
})();