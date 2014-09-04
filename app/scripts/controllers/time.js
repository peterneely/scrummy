'use strict';

(function () {
  var timeController = ['$scope', '$modalInstance', 'coreData',
    function ($scope, $modalInstance, coreData) {

      var self = this;

      function list(items) {
        var array = [];
        angular.forEach(items, function (item) {
          array.push({
            id: item.$id,
            text: item.name
          });
        });
        return _.sortBy(array, 'text');
      }

      function newChoice(type, term) {
        var choice = {
          id: '',
          text: term
        };
        $scope.$apply(function () {
          self.selected[type] = choice;
        });
        return choice;
      }

      self.selected = {};

      self.options = function(type){
        return {
          data: list(coreData[type]),
          placeholder: 'Select a ' + type,
          allowClear: true,
          createSearchChoice: function (term) {
            return newChoice(type, term);
          }
        };
      };

//      self.projectOptions = {
//        data: list(coreData.projects),
//        placeholder: 'Select a project',
//        allowClear: true,
//        createSearchChoice: function (term) {
//          return newChoice('project', term);
//        }
//      };

      self.projects = list(coreData.projects);
      self.tasks = list(coreData.tasks);

      self.ok = function () {
        $modalInstance.close();
      };

      self.cancel = function () {
        $modalInstance.dismiss('cancel');
      };


    }];

  angular
    .module('scrummyApp')
    .controller('Time', timeController);
})();