'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Timesheet', TimesheetController);

  TimesheetController.$inject = ['$modal', 'Data', 'Time', 'viewData'];

  function TimesheetController($modal, Data, Time, viewData) {
    console.log(viewData);

    var _times = sortTimes();

    watchTimes();

    var vm = this;
    vm.active = active;
    vm.days = days;
    vm.open = onOpen;
    vm.times = times;
    vm.weeks = weeks;

    function active(timeEntry){
      return !_.isEmpty(timeEntry.time.start) && _.isEmpty(timeEntry.time.end);
    }

    function days(week) {
      return keys(_times[week]);
    }

    function keys(obj) {
      return mostRecentFirst(Object.keys(obj));
    }

    function mostRecentFirst(collection) {
      return _.sortBy(collection).reverse();
    }

    function onOpen() {
      $modal.open({
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
      });
    }

    function sortTimes() {
      return Data.nest(viewData.times, [byWeek, byDay]);

      function byDay(time) {
        return Time.daySortOrder(time.time.date);
      }

      function byWeek(time) {
        return Time.weekSortOrder(time.time.date);
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