'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Timesheet', TimesheetController);

  TimesheetController.$inject = ['$modal', '$interval', 'Data', 'Time', 'viewData'];

  function TimesheetController($modal, $interval, Data, Time, viewData) {
    console.log(sortTimes());

    var _times = sortTimes();

    watchTimes();

    var vm = this;
    vm.active = active;
    vm.days = days;
    vm.duration = duration;
    vm.open = onOpen;
    vm.times = times;
    vm.weeks = weeks;

    vm.count = 1;

    $interval(function(){
      vm.count++;
    }, 1000);

//    $scope.$on('$destroy', function () { $interval.cancel(refreshDuration); });

    function active(time){
      return time.$id === viewData.user.state.activeTime.id;
    }

    function days(week) {
      return keys(_times[week]);
    }

    function duration(time) {
      return Time.duration(time);
    }

    function keys(obj) {
      return mostRecentFirst(Object.keys(obj));
    }

    function mostRecentFirst(collection) {
      return _.sortBy(collection).reverse();
    }

    function onOpen() {
      $modal.open({
        templateUrl: '../../views/time.html',
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
      });
    }

    function sortTimes() {
      return Data.nest(viewData.times, [byWeek, byDay]);

      function byDay(time) {
        return Time.daySortOrder(time.time.start);
      }

      function byWeek(time) {
        return Time.weekSortOrder(time.time.start);
      }
    }

    function times(week, day) {
      return mostRecentFirst(_times[week][day]);
    }

    function watchTimes() {
      Data.watch(viewData.times, function () {
        _times = sortTimes();
      });
    }

    function weeks() {
      return keys(_times);
    }
  }

})();