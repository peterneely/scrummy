'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeForm', TimeFormService);

  TimeFormService.$inject = ['$filter', '$modal', 'Fn', 'State', 'TimeClock', 'TimeResource', 'TimeUtil'];

  function TimeFormService($filter, $modal, Fn, State, TimeClock, TimeResource, TimeUtil) {

    return {
      fillOtherFields: fillOtherFields,
      fillSelects: fillSelects,
      map: map,
      openForm: openForm,
      stopTimer: stopTimer,
      updateElapsed: updateElapsed
    };

    function fillSelects(timeModel, viewData) {
      var state = viewData.user.state;
      var timeState = angular.isDefined(state) ? state.time : {};
      ['client', 'project', 'task'].forEach(function (type) {
        timeModel[type] = viewData.add ? defaultValue(type) : actualValue(type);
      });

      function actualValue(type) {
        return viewData[type];
      }

      function defaultValue(type) {
        return Fn.has(timeState, type) ? timeState[type] : first();

        function first() {
          return viewData[Fn.plural(type)][0];
        }
      }
    }

    function fillOtherFields(timeModel, viewData) {
      timeModel.notes = viewData.notes;
      timeModel.time.date = TimeUtil.parseDate(viewData.time.start);
      timeModel.time.start = TimeUtil.parseTime(viewData.time.start);
      timeModel.time.end = TimeUtil.parseTime(viewData.time.end);
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
      var missing = missingType();
      if (missing !== '') {
        enter(missing);
      } else {
        openNow();
      }

      function missingType() {
        var types = ['clients', 'projects', 'tasks'];
        var missing = '';
        for (var i = 0, len = types.length; i < len; i++) {
          var type = types[i];
          if (data[type].length === 0) {
            missing = type;
            break;
          }
        }
        return missing;
      }

      function openNow() {
        $modal.open({
          templateUrl: '/app/time/form.html',
          controller: 'TimeForm as f',
          resolve: {
            viewData: function () {
              return angular.isDefined(editData) ? updateModel() : addModel();
            }
          }
        });

        function addModel() {
          var model = data;
          model.add = true;
          model.isActive = false;
          return Fn.deleteProperties(model, ['type']);
        }

        function updateModel() {
          var model = Fn.merge(data, editData);
          model.add = false;
          model.isActive = editData.time.end === '';
          return Fn.deleteProperties(model, ['type', 'times']);
        }
      }

      function enter(missing) {
        State.go('nav.' + missing);
      }
    }

    function stopTimer(item) {
      TimeResource.stopTimer(item);
      TimeClock.stopClock();
    }

    function updateElapsed(newTime, oldTime) {
      var date = newTime.date;
      var timeStart = newTime.start;
      var timeEnd = newTime.end;
      var seconds = TimeUtil.parseSeconds(oldTime.start);
      var start = TimeUtil.dateTime(date, timeStart, seconds);
      var end = timeEnd === '' ? TimeUtil.now() : TimeUtil.dateTime(date, timeEnd, seconds);
      return TimeUtil.elapsed(start, end);
    }
  }

})();