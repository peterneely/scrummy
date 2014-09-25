'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$rootScope', '$moment', '$filter', '$modal', 'Config', 'Resource', 'Url', 'Async'];

  function TimeService($rootScope, $moment, $filter, $modal, Config, Resource, Url, Async) {

    return {
      daySortOrder: daySortOrder,
      defaultTime: defaultTime,
      parseInput: parseInput,
      group: group,
      isToday: isToday,
      openTimeForm: openTimeForm,
      parseDate: parseDate,
      parseTime: parseTime,
      saveNewTypes: saveNewTypes,
      selectify: selectify,
      startNewTimer: startNewTimer,
      stopActiveTimers: stopActiveTimers,
      weekSortOrder: weekSortOrder,
      whenTick: whenTick
    };

    function daySortOrder(jsDate) {
      var dayNumber = $filter('doubleDigits')($moment(jsDate).isoWeekday());
      var dayTitle = $moment(jsDate).format('ddd, DD MMM YYYY');
      return dayNumber + ':' + dayTitle;
    }

    function defaultTime() {
      return $filter('date')(new Date(), 'HH:mm');
    }

    function group(seq, keys) {
      if (!keys.length) {
        return seq;
      }
      var first = keys[0];
      var rest = keys.slice(1);
      return _.mapValues(_.groupBy(seq, first), function (value) {
        return group(value, rest);
      });
    }

    function isToday(date) {
      return $moment(date).isSame($moment(new Date()), 'day');
    }

    function openTimeForm(data, editData) {
      $modal.open({
        templateUrl: '/app/time-form/time-form.html',
        controller: 'TimeForm as tf',
        resolve: {
          viewData: function () {
            return viewData();
          }
        }
      });

      function viewData() {
        var addNewTime = editData === undefined;
        var model = addNewTime ? data : _.merge(data, editData);
        model.add = addNewTime;
        return model;
      }
    }

    function parseDate(dateTimeString) {
      return dateTimeString.slice(0, 10);
    }

    function parseInput(value) {
      if (noTime(value)) {
        return value;
      } else if (invalidTime(value)) {
        return defaultTime();
      } else {
        return formattedTime(value);
      }

      function formattedTime(value) {
        return $filter('formatTime')(value);
      }

      function invalidTime(value) {
        return !$filter('validTime')(value);
      }

      function noTime(value) {
        return value === '';
      }
    }

    function parseTime(dateTimeString) {
      return dateTimeString.slice(-5);
    }

    function saveNewTypes(timeModel) {
      return Async.promise(save);

      function save(deferred) {
        ['client', 'project', 'task'].forEach(function (type) {
          var time = timeModel[type];
          if (time.id === '') {
            var url = Url[$filter('plural')(type)]();
            Resource.post(url, {name: time.text}).then(function (ref) {
              timeModel[type].id = ref.name();
            });
          }
        });
        deferred.resolve(timeModel);
      }
    }

    function selectify(items) {
      var array = [];
      items.forEach(function (item) {
        array.push({
          id: item.$id,
          text: item.name
        });
      });
      return $filter('orderBy')(array, 'text');
    }

    function startNewTimer(timeModel) {
      return Async.promise(startTimer);

      function startTimer(deferred) {
        timeModel.time = {
          date: timeModel.time.date,
          start: start(timeModel.time),
          end: end(timeModel.time)
        };
        Resource.post(Url.times(), timeModel).then(function () {
          deferred.resolve({
            client: timeModel.client,
            project: timeModel.project,
            task: timeModel.task
          });
        });

        function dateTime(time, date) {
          return time === '' ?
            '' :
            $filter('date')(date, Config.dateFormat) + ' ' + time;
        }

        function end(model) {
          return dateTime(model.end, model.date);
        }

        function start(model) {
          return dateTime(model.start || defaultTime(), model.date);
        }
      }
    }

    function stopActiveTimers(timeModel, times) {
      return Async.promise(stopActive);

      function stopActive(deferred) {
        var activeTimers = getActiveTimers();
        if (activeTimers.length > 0) {
          stop(activeTimers);
        }
        deferred.resolve(timeModel);

        function getActiveTimers() {
          return _.where(times, function (time) {
            return time.time.end === '';
          });
        }

        function stop(activeTimers) {
          var endTime = $filter('date')(new Date(), Config.dateTimeFormat);
          activeTimers.forEach(function (activeTimer) {
            Resource.put(Url.time(activeTimer.$id), {end: endTime});
          });
        }
      }
    }

    function weekSortOrder(jsDate) {
      var mDate = $moment(jsDate);
      return mDate.year() + '_' + $filter('doubleDigits')(mDate.isoWeek());
    }

    function whenTick(callback){
      $rootScope.$on('tick', function(event){
        event.stopPropagation();
        callback();
      });
    }
  }

})();