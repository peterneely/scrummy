'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Times', TimesController);

  TimesController.$inject = ['$scope', '$modal', 'Timer', 'Resource', 'Time', 'viewData'];

  function TimesController($scope, $modal, Timer, Resource, Time, viewData) {
    console.log(viewData);

    var _times = sortTimes();

    watchTimes();
    startTimer();

    var vm = this;
    vm.days = days;
    vm.open = onOpen;
    vm.times = times;
    vm.weeks = weeks;

//    $scope.$on('$destroy', function () { $interval.cancel(refreshDuration); });

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
        templateUrl: '/app/time-form/time-form.html',
        controller: 'TimeForm as tf',
        resolve: {
          viewData: function () {
            return {
              user: viewData.user,
              clients: viewData.clients,
              projects: viewData.projects,
              tasks: viewData.tasks,
              times: viewData.times
            };
          }
        }
      });
    }

    function sortTimes() {
      return Time.group(viewData.times, [byWeek, byDay]);

      function byDay(time) {
        return Time.daySortOrder(time.time.start);
      }

      function byWeek(time) {
        return Time.weekSortOrder(time.time.start);
      }
    }

    function startTimer(){
      if(!Timer.hasStarted()){
        Timer.start();
      }
    }

    function times(week, day) {
      return mostRecentFirst(_times[week][day]);
    }

    function watchTimes() {
      Resource.watch(viewData.times, function () {
        _times = sortTimes();
      });
    }

    function weeks() {
      return keys(_times);
    }
  }

})();