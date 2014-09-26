'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$filter', '$modal', 'Async', 'Config', 'Resource', 'Url', 'Fn'];

  function TimeService($filter, $modal, Async, Config, Resource, Url, Fn) {

    return {
      dayTitle: dayTitle,
      defaultTime: defaultTime,
      map: map,
      openForm: openForm,
      parseDate: parseDate,
      parseInput: parseInput,
      parseTime: parseTime,
      saveNewTypes: saveNewTypes,
      sort: sort,
      startNewTimer: startNewTimer,
      stopActiveTimers: stopActiveTimers,
      updateTimes: updateTimes
    };

    function dayTitle(dayHeader) {
      return dayHeader.substr(dayHeader.indexOf(':') + 1);
    }

    function defaultTime() {
      return Fn.format(Date.now(), Config.timeFormat);
    }

    function map(items) {
      var array = [];
      items.forEach(function (item) {
        array.push({
          id: item.$id,
          text: item.name
        });
      });
      return $filter('orderBy')(array, 'text');
    }

    function openForm(data, editData) {
      $modal.open({
        templateUrl: '/app/time/form.html',
        controller: 'TimeForm as tf',
        resolve: {
          viewData: function () {
            return viewData();
          }
        }
      });

      function viewData() {
        var add = angular.isUndefined(editData);
        var model = add ? data : Fn.merge(data, editData);
        model.add = add;
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
        return Time.defaultTime();
      } else {
        return formattedTime(value);
      }

      function formattedTime(value) {
        var regex = /(?:[^:.,])+/g;
        var matched;
        var elements = [];
        while ((matched = regex.exec(value))) {
          elements.push(Fn.doubleDigits(matched[0]));
        }
        if (elements.length === 1) {
          elements.push('00');
        }
        return elements.join(':');
      }

      function invalidTime(timeString) {
        return !timeString.match(/^(?:0?[0-9]|1[0-9]|2[0-3])([:.,][0-5][0-9])?$/);
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
            var url = Url[Fn.plural(type)]();
            Resource.post(url, {name: time.text}).then(function (ref) {
              timeModel[type].id = ref.name();
            });
          }
        });
        deferred.resolve(timeModel);
      }
    }

    function sort(times) {
      return Fn.group(times, [byWeek, byDay]);

      function byDay(time) {
        var date = time.time.start;
        var dayNumber = Fn.doubleDigits(Fn.isoWeekDay(date));
        var dayString = Fn.format(date, Config.dayTitleFormat);
        return dayNumber + ':' + dayString;
      }

      function byWeek(time) {
        var date = time.time.start;
        var year = Fn.format(date, 'YYYY');
        var isoWeek = Fn.doubleDigits(Fn.isoWeek(date));
        return year + '_' + isoWeek;
      }
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
            Fn.format(date, Config.dateFormat) + ' ' + time;
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
          return Fn.where(times, function (time) {
            return time.time.end === '';
          });
        }

        function stop(activeTimers) {
          var endTime = Fn.format(Fn.now(), Config.dateTimeFormat);
          activeTimers.forEach(function (activeTimer) {
            Resource.put(Url.time(activeTimer.$id), {end: endTime});
          });
        }
      }
    }

    function updateTimes(type, id, text) {
      var singleType = Fn.singular(type);
      return Resource.getAll(Url.times())
        .then(filter)
        .then(update);

      function filter(times) {
        var filtered = Fn.where(times, function (time) {
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
  }

})();