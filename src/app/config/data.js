'use strict';

(function () {

  angular
    .module('scrummyApp')
    .value('TestData', testData());

  function testData() {
    return {
      user: {
//        email: 'neely.peter@gmail.com',
        email: 'pgneely@gmail.com',
        password: 'testing',
        confirmPassword: 'testing'
      }
    };
  }

})();