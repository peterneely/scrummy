'use strict';

(function(){
  var authService = ['$firebaseSimpleLogin', 'FIREBASE_URL', function($firebaseSimpleLogin, FIREBASE_URL){

    var ref= new Firebase(FIREBASE_URL);
    var fb = $firebaseSimpleLogin(ref);

    return {
      register: function(user){
        return fb.$createUser(user.email, user.password);
      }
    };
  }];

  angular
    .module('scrummyApp')
    .factory('Auth', authService);
})();