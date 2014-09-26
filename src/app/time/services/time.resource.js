'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeResource', TimeResourceService);

  TimeResourceService.$inject = ['Async', 'Config', 'Fn', 'Resource', 'TimeUtil', 'Url'];

  function TimeResourceService(Async, Config, Fn, Resource, TimeUtil, Url) {

    return {
      saveNewTypes: saveNewTypes,
      saveState: saveState,
      startNewTimer: startNewTimer,
      stopActiveTimers: stopActiveTimers,
      updateTimes: updateTimes
    };

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

    function saveState(model){
      return Resource.put(Url.userStateTime(), model);
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
            TimeUtil.format(date, Config.dateFormat) + ' ' + time;
        }

        function end(model) {
          return dateTime(model.end, model.date);
        }

        function start(model) {
          return dateTime(model.start || TimeUtil.defaultTime(), model.date);
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
          var endTime = TimeUtil.format(TimeUtil.now(), Config.dateTimeFormat);
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
          console.log(singleType, time, id);
          return time[singleType].id === id;
        });
        return Async.when(filtered);
      }

      function update(filteredTimes) {
        console.log(filteredTimes);
        filteredTimes.forEach(function (filteredTime) {
          var url = Url.timeType(filteredTime.$id, singleType);
          Resource.put(url, {text: text});
        });
      }
    }
  }

})();