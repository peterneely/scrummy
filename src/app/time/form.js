'use strict';

(function () {

  angular
    .module('scrummyApp')
    .controller('TimeForm', TimeFormController);

  TimeFormController.$inject = ['$modalInstance', 'Fn', 'Resource', 'Time', 'Url', 'viewData'];

  function TimeFormController($modalInstance, Fn, Resource, Time, Url, viewData) {

    var _add = viewData.add;
    var _edit = !_add;

    var vm = this;
    vm.cancel = cancel;
    vm.checkToday = checkToday;
    vm.isToday = true;
    vm.start = startTimer;
    vm.timeModel = {
      client: {},
      project: {},
      task: {},
      notes: '',
      time: {
        date: Fn.now(),
        start: '',
        end: ''
      }
    };
    vm.viewData = viewData;

    fillForm();

    function cancel() {
      $modalInstance.dismiss();
    }

    function checkToday() {
      vm.isToday = Fn.isToday(vm.timeModel.time.date);
    }

    function fillForm() {
      fillSelects();
      if (_edit) {
        fillOtherFields();
      }

      function fillOtherFields() {
        vm.timeModel.notes = viewData.notes;
        vm.timeModel.time.date = Time.parseDate(viewData.time.start);
        vm.timeModel.time.start = Time.parseTime(viewData.time.start);
        vm.timeModel.time.end = Time.parseTime(viewData.time.end);
      }

      function fillSelects() {
        var savedState = viewData.user.state.time || {};
        ['client', 'project', 'task'].forEach(function (type) {
          vm.timeModel[type] = _add ? defaultValue(type) : actualValue(type);
        });

        function actualValue(type) {
          return viewData[type];
        }

        function defaultValue(type) {
          return Fn.has(savedState, type) ? savedState[type] : first();

          function first() {
            return viewData[Fn.plural(type)][0];
          }
        }
      }
    }

    function startTimer() {
      $modalInstance.close();

      Time.saveNewTypes(vm.timeModel)
        .then(stopActiveTimers)
        .then(startNewTimer)
        .then(saveState);

      function stopActiveTimers(timeModel) {
        return Time.stopActiveTimers(timeModel, viewData.times);
      }

      function startNewTimer(timeModel) {
        return Time.startNewTimer(timeModel);
      }

      function saveState(stateModel) {
        return Resource.put(Url.userStateTime(), stateModel);
      }
    }
  }

})
();