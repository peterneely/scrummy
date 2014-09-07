'use strict';

(function () {

  angular
    .module('scrummyApp')
    .value('TestData', testData());

  function testData() {
    return {
      user: {
        email: 'pgneely@gmail.com',
        password: 'testing',
        confirmPassword: 'testing'
      }
    };
  }

})();