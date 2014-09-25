'use strict';

(function () {
  angular
    .module('scrummyApp')
    .factory('Time', TimeService);

  TimeService.$inject = ['$filter', '$modal', '$moment', '$rootScope', 'Async', 'Config', 'Resource', 'Url', 'Util'];

  function TimeService($filter, $modal, $moment, $rootScope, Async, Config, Resource, Url, Util) {

    return {
      group: group,
      isToday: isToday,
      openTimeForm: openTimeForm,
      parseDate: parseDate,
      parseTime: parseTime,
      saveNewTypes: saveNewTypes,
      selectify: selectify,
      stopActiveTimers: stopActiveTimers,

      whenTick: whenTick
    };



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

    function parseTime(dateTimeString) {
      return dateTimeString.slice(-5);
    }

    function saveNewTypes(timeModel) {
      return Async.promise(save);

      function save(deferred) {
        ['client', 'project', 'task'].forEach(function (type) {
          var time = timeModel[type];
          if (time.id === '') {
            var url = Url[Util.plural(type)]();
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



    function whenTick(callback){
      $rootScope.$on('tick', function(event){
        event.stopPropagation();
        callback();
      });
    }
  }

})();