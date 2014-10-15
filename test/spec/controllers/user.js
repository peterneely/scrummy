'use strict';

describe('Controller: User', function () {

  // load the controller's module
  beforeEach(angular.mock.module('scrummyApp'));

  var UserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(angular.mock.inject(function ($controller, $rootScope, State) {
    scope = $rootScope.$new();

    var mock = {
      $scope: scope,
      State: State
    };
    UserCtrl = $controller('User as u', mock);
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
