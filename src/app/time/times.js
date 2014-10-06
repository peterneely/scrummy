'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('Times', TimesController);

  TimesController.$inject = ['AdminTimes', 'Device', 'Fn', 'Resource', 'Time', 'viewData'];

  function TimesController(AdminTimes, Device, Fn, Resource, Time, viewData) {

//    console.log(viewData);

    var _times = sortTimes();

    var vm = this;
    vm.addTime = addTime;
    vm.allowSearch = allowSearch;
    vm.allowSearchAdmin = allowSearchAdmin;
    vm.clearSearch = clearSearch;
    vm.clearAdminSearch = clearAdminSearch;
    vm.days = days;
    vm.dayTitle = dayTitle;
    vm.canFocus = !Device.isPortable();
    vm.search = { text: '' };
    vm.searchAdmin = AdminTimes.getSearch();
    vm.times = times;
    vm.viewData = viewData;
    vm.weeks = weeks;

    checkNoData();
    watchTimes();

    function addTime() {
      return Time.openForm(viewData);
    }

    function allowSearch() {
      return !vm.noData && Fn.isEmpty(AdminTimes.getSearch());
    }

    function allowSearchAdmin() {
      return !vm.noData && !Fn.isEmpty(AdminTimes.getSearch());
    }

    function checkNoData() {
      vm.noData = viewData.times.length === 0;
    }

    function clearSearch(){
      vm.search = { text: '' };
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
        checkNoData();
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