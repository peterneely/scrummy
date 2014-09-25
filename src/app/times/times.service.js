'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Times', TimesService);

  TimesService.$inject = ['$moment', 'Async', 'Config', 'Resource', 'Url', 'Util'];

  function TimesService($moment, Async, Config, Resource, Url, Util) {

    return {
      daySortOrder: daySortOrder,
      dayTitle: dayTitle,
      updateTimes: updateTimes,
      weekSortOrder: weekSortOrder
    };

    function daySortOrder(jsDate) {
      var dayNumber = Util.doubleDigits($moment(jsDate).isoWeekday());
      var dayString = $moment(jsDate).format(Config.dayTitleFormat);
      return dayNumber + ':' + dayString;
    }

    function dayTitle(dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
    }

    function updateTimes(type, id, text) {
      var singleType = Util.singular(type);
      return Resource.getAll(Url.times())
        .then(filter)
        .then(update);

      function filter(times) {
        var filtered = _.where(times, function (time) {
          return time[singleType].id === id;
        });
        return Async.when(filtered);
      }

      function update(filteredTimes) {
        filteredTimes.forEach(function (filteredTime) {
          var url = Url.timeType(filteredTime.$id, singleType);
          Resource.put(url, {text: text});
        });
      }
    }

    function weekSortOrder(jsDate) {
      var mDate = $moment(jsDate);
      return mDate.year() + '_' + Util.doubleDigits(mDate.isoWeek());
    }
  }

})();