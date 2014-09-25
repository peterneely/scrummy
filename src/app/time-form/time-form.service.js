'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeForm', TimeFormService);

  TimeFormService.$inject = ['$filter', '$modal', '$moment', 'Time', 'Util'];

  function TimeFormService($filter, $modal, $moment, Time, Util) {

    return {
      isToday: isToday,
      map: map,
      open: openForm,
      parseDate: parseDate,
      parseInput: parseInput,
      parseTime: parseTime
    };

    function isToday(date) {
      return $moment(date).isSame($moment(new Date()), 'day');
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
        return Time.defaultTime();
      } else {
        return formattedTime(value);
      }

      function formattedTime(value) {
        var regex = /(?:[^:.,])+/g;
        var matched;
        var elements = [];
        while ((matched = regex.exec(value))) {
          elements.push(Util.doubleDigits(matched[0]));
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
  }

})();