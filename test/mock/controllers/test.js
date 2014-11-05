'use strict';

describe('Test Controller unit test', function() {

	beforeEach(module('TestApp'));

	var scope, ctrl;

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		ctrl = $controller('Test', {
			$scope: scope
		});
	}))

	it('should return the correct name', function() {
		expect(scope.name).toBe('Peter');
	});
})