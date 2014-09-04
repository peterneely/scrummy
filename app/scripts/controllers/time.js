'use strict';

(function () {
  var timeController = ['$scope', '$modalInstance', 'coreData',
    function ($scope, $modalInstance, coreData) {

      var self = this;

      self.selected = {};

      self.options = {};

      self.ok = function () {
        $modalInstance.close();
      };

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      (function initOptions() {
        var types = ['clients', 'projects', 'tasks'];
        angular.forEach(types, function (type) {
          self.options[type] = {
            data: getChoices(coreData[type]),
            placeholder: placeholder(type),
            allowClear: true,
            createSearchChoice: function (term) {
              return addChoice(type, term);
            }
          };
        });

        function getChoices(items) {
          var array = [];
          angular.forEach(items, function (item) {
            array.push({
              id: item.$id,
              text: item.name
            });
          });
          return _.sortBy(array, 'text');
        }

        function placeholder(type) {
          var singular = type.slice(0, -1);
          return singular.charAt(0).toUpperCase() + singular.slice(1);
        }

        function addChoice(type, term) {
          var choice = {
            id: '',
            text: term
          };
          $scope.$apply(function () {
            self.selected[type] = choice;
          });
          return choice;
        }
      })();
    }];

  angular
    .module('scrummyApp')
    .controller('Time', timeController);
})();