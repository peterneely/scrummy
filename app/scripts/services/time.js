'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$moment', '$filter'];

  function TimeService($moment, $filter) {

    return {
      modalConfig: modalConfig,
      sort: sort
    };

    function modalConfig(viewData) {
      return {
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
    }

    function sort(times) {
      return nest(times, [byWeek, byDay]);

      function byDay(time) {
        var jsDate = time.time.date;
        var dayNumber = isoDay(jsDate);
        var dayTitle = $moment(jsDate).format('ddd, DD MMM YYYY');
        return dayNumber + ':' + dayTitle;
      }

      function byWeek(time) {
        return isoWeek(time.time.date);
      }

      function isoDay(jsDate) {
        return $filter('doubleDigits')($moment(jsDate).isoWeekday());
      }

      function isoWeek(jsDate) {
        var mDate = $moment(jsDate);
        return mDate.year() + '_' + $filter('doubleDigits')(mDate.isoWeek());
      }

      function nest(seq, keys) {
        if (!keys.length) {
          return seq;
        }
        var first = keys[0];
        var rest = keys.slice(1);
        return _.mapValues(_.groupBy(seq, first), function (value) {
          return nest(value, rest);
        });
      }
    }
  }

})();