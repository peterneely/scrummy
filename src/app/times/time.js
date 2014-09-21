'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Time', TimeController);

  TimeController.$inject = ['$scope', '$modalInstance', 'Time', 'Resource', 'Url', 'viewData'];

  function TimeController($scope, $modalInstance, Time, Resource, Url, viewData) {

    var vm = this;

    vm.cancel = cancel;
    vm.data = viewData;
//    vm.timeState = stateRoot();
    vm.start = startTimer;
    vm.timeModel = {
      client: {},
      project: {},
      task: {},
      time: {
        date: Date.now(),
        start: '',
        end: ''
      }
    };

//    $scope.$watch(watchTimeStart, function () {
//      vm.isToday = Time.isToday(vm.time.time.start);
//    });

//    function watchTimeStart(){
//      return vm.time.time.start;
//    }

    function cancel() {
      $modalInstance.dismiss();
    }

//    function stateRoot() {
//      try {
//        return viewData.user.state.timeEntry;
//      } catch (err) {
//        return {};
//      }
//    }

    function startTimer() {
      try {
        $modalInstance.close();
        start();
      } catch (error) {
      }

      function start() {
        Time.saveNewTypes(vm.timeModel)
          .then(stopActiveTimers)
          .then(startNewTimer)
          .then(saveState);

        function stopActiveTimers(timeModel) {
          return Time.stopActiveTimers(timeModel, viewData.times);
        }

        function startNewTimer(timeModel) {
          return Time.startNewTimer(timeModel);
        }

        function saveState(stateModel) {
          return Resource.put(Url.userStateTime(), stateModel);
        }
      }
    }
  }

})();