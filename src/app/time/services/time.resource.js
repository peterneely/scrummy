'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeResource', TimeResourceService);

  TimeResourceService.$inject = ['Async', 'Config', 'Fn', 'Resource', 'TimeClock', 'TimeUtil', 'Url'];

  function TimeResourceService(Async, Config, Fn, Resource, TimeClock, TimeUtil, Url) {

    return {
      deleteTimer: deleteTimer,
      saveNewTypes: saveNewTypes,
      saveState: saveState,
      startNewTimer: startNewTimer,
      stopActiveTimers: stopActiveTimers,
      stopTimer: endNow,
      updateTimer: updateTimer,
      updateTimes: updateTimes
    };

    function deleteTimer(timeId){
      Resource.delete(Url.timeEntry(timeId));
    }

    function endNow(time) {
      var now = TimeUtil.format(TimeUtil.now(), Config.dateTimeSecondsFormat);
      Resource.put(Url.time(time.$id), {end: now});
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

    function saveState(model) {
      return Resource.put(Url.userStateTime(), model);
    }

    function startNewTimer(timeModel) {
      return Async.promise(startTimer);

      function startTimer(deferred) {
        timeModel.time = {
          start: startDateTime(timeModel.time),
          end: endDateTime(timeModel.time)
        };
        TimeClock.startClock(timeModel.time.start);
        Resource.post(Url.times(), timeModel).then(function () {
          deferred.resolve(stateModel(timeModel));
        });

        function endDateTime(model) {
          var time = model.end;
          return time === '' ? '' : TimeUtil.dateTime(model.date, time);
        }

        function startDateTime(model) {
          var time = model.start || TimeUtil.defaultTime();
          return TimeUtil.dateTime(model.date, time);
        }
      }
    }

    function stateModel(timeModel) {
      return {
        client: timeModel.client,
        project: timeModel.project,
        task: timeModel.task
      };
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
          activeTimers.forEach(function (activeTimer) {
            endNow(activeTimer);
          });
          TimeClock.stopClock();
        }
      }
    }

    function updateTimer(current, original) {
      return Async.promise(update);

      function update(deferred) {
        var seconds = TimeUtil.parseSeconds(original.time.start);
        current.time = {
          start: startDateTime(current.time),
          end: endDateTime(current.time)
        };
        Resource.put(Url.timeEntry(original.$id), current).then(function () {
          deferred.resolve(stateModel(current));
        });

        function endDateTime(model) {
          var time = model.end;
          return time === '' ? '' : TimeUtil.dateTime(model.date, time, seconds);
        }

        function startDateTime(model) {
          return TimeUtil.dateTime(model.date, model.start, seconds);
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