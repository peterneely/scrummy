'use strict';

(function () {

  angular
    .module('scrummyApp')
    .value('TestData', testData());

  function testData() {
    return {
      user: {
//        email: 'pgneely@gmail.com',
//        email: 'neely.peter@gmail.com',
//        email: 'peterneelywork@icloud.com',
        email: 'p.neely@icloud.com',
        password: 'testing',
        confirmPassword: 'testing'
      }
    };
  }

})();