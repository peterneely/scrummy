'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Times', TimesController);

  TimesController.$inject = ['_', 'AdminTimes', 'Device', '$filter', 'Fn', '$moment', 'Resource', 'Time', 'viewData'];

  function TimesController(_, AdminTimes, Device, $filter, Fn, $moment, Resource, Time, viewData) {

    var _times = sortTimes();

    var vm = this;
    vm.addTime = addTime;
    vm.allowSearch = allowSearch;
    vm.allowSearchAdmin = allowSearchAdmin;
    vm.canFocus = !Device.isMobile();
    vm.clearSearch = clearSearch;
    vm.clearAdminSearch = clearAdminSearch;
    vm.days = days;
    vm.dayTitle = dayTitle;
    vm.durations = durations;
    vm.onlyTimesMissing = vm.noTimes && !vm.dataMissing;
    vm.search = {
      text: ''
    };
    vm.searchAdmin = AdminTimes.getSearch();
    vm.timeFormat = {
      isDecimal: false
    };
    vm.times = times;
    vm.viewData = viewData;
    vm.weeks = weeks;

    checkNoData();
    checkNoTimes();
    watchTimes();

    function addTime() {
      return Time.openForm(viewData);
    }

    function allowSearch() {
      return !vm.noTimes && Fn.isEmpty(AdminTimes.getSearch());
    }

    function allowSearchAdmin() {
      return !vm.noTimes && !Fn.isEmpty(AdminTimes.getSearch());
    }

    function checkNoData() {
      vm.dataMissing = ['clients', 'projects', 'tasks'].some(function (type) {
        return angular.isUndefined(viewData[type]) || viewData[type].length === 0;
      });
    }

    function checkNoTimes() {
      vm.noTimes = angular.isUndefined(viewData.times) || viewData.times.length === 0;
    }

    function clearSearch() {
      vm.search = {
        text: ''
      };
    }

    function clearAdminSearch() {
      AdminTimes.clearSearch();
    }

    function days(week) {
      return keys(_times[week]);
    }

    function dayTitle(dayHeader) {
      return Time.dayTitle(dayHeader);
    }

    function durations(week, day) {
      var times = $filter('filter')(_times[week][day], vm.search.text);
      var milliseconds = _.map(times, function (time) {
        return Time.elapsedMilliseconds(time.time.start, time.time.end);
      });
      return _.sum(milliseconds);
    }

    function keys(obj) {
      return Fn.sortDesc(Object.keys(obj));
    }

    function sortTimes() {
      return Time.sort(viewData.times);
    }

    function times(week, day) {
      return Fn.sortDescBy(_times[week][day], orderBy);

      function orderBy(item) {
        return item.time.start;
      }
    }

    function watchTimes() {
      Resource.watch(viewData.times, changed);

      function changed() {
        checkNoTimes();
        _times = sortTimes();
        Time.notifyTimesUpdated();
        AdminTimes.invalidate();
      }
    }

    function weeks() {
      return keys(_times);
    }
  }

})();
