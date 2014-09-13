'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Timesheet', TimesheetController);

  TimesheetController.$inject = ['$scope', '$modal', 'Time', 'viewData'];


  function TimesheetController($scope, $modal, Time, viewData) {

    var vm = this;

    $scope.$watch(viewData.times, function(){
      console.log(viewData.times);
      vm.times = Time.group(viewData.times);
    });

    vm.open = onOpen;
    //vm.times = Time.group(viewData.times);



    function onOpen() {
      var config = {
        templateUrl: 'views/time.html',
        controller: 'Time as time',
        resolve: {
          viewData: function () {
            return {
              user: viewData.user,
              clients: viewData.clients,
              projects: viewData.projects,
              tasks: viewData.tasks
            };
          }
        }
      };
      $modal.open(config);
    }
  }

})();