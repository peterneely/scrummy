'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeResource', TimeResourceService);

  TimeResourceService.$inject = ['Async', 'Config', 'Fn', 'Resource', 'TimeClock', 'TimeUtil', 'Url'];

  function TimeResourceService(Async, Config, Fn, Resource, TimeClock, TimeUtil, Url) {

    return {
      deleteTimer: deleteTimer,
      removeTimes: removeTimes,
      saveNewTypes: saveNewTypes,
      saveState: saveState,
      startNewTimer: startNewTimer,
      stopActiveTimers: stopActiveTimers,
      stopTimer: stopTimer,
      updateTimer: updateTimer,
      updateTimes: updateTimes
    };

    function deleteTimer(timeId) {
      Resource.delete(Url.timeEntry(timeId));
    }

    function saveNewTypes(timeModel) {
      return Async.promise(save);

      function save(deferred) {
        var promises = [];
        var types = [];
        ['client', 'project', 'task'].forEach(function (type) {
          var item = timeModel[type];
          if (item.id === '') {
            var url = Url[Fn.plural(type)]();
            var promise = Resource.post(url, {name: item.text});
            promises.push(promise);
            types.push(type);
          }
        });
        Async.all(promises).then(function (refs) {
          for (var i = 0, len = refs.length; i < len; i++) {
            timeModel[types[i]].id = refs[i].name();
          }
          deferred.resolve(timeModel);
        });
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
          deferred.resolve(_stateModel(timeModel));
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
            stopTimer(activeTimer);
          });
          TimeClock.stopClock();
        }
      }
    }

    function stopTimer(time) {
      var now = TimeUtil.format(TimeUtil.now(), Config.dateTimeSecondsFormat);
      Resource.put(Url.time(time.$id), {end: now});
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
          deferred.resolve(_stateModel(current));
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

    function removeTimes(type, id) {
      return _filterTimes(type, id, remove);

      function remove(times, time) {
        Resource.remove(times, time);
      }
    }

    function updateTimes(type, id, text) {
      return _filterTimes(type, id, update);

      function update(times, time) {
        var url = Url.timeType(time.$id, type);
        Resource.put(url, {text: text});
      }
    }

    function _filterTimes(type, id, callback) {
      return getTimes().then(filter).then(action);

      function getTimes() {
        return Resource.getAll(Url.times());
      }

      function filter(times) {
        var filtered = Fn.where(times, function (time) {
          return time[type].id === id;
        });
        return Async.when({
          times: times,
          filteredTimes: filtered
        });
      }

      function action(result) {
        result.filteredTimes.forEach(function (time) {
          callback(result.times, time);
        });
      }
    }

    function _stateModel(timeModel) {
      return {
        client: timeModel.client,
        project: timeModel.project,
        task: timeModel.task
      };
    }
  }

})();