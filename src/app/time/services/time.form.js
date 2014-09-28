'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('TimeForm', TimeFormService);

  TimeFormService.$inject = ['$filter', '$modal', 'Fn', 'TimeClock', 'TimeResource'];

  function TimeFormService($filter, $modal, Fn, TimeClock, TimeResource) {

    return {
      map: map,
      openForm: openForm,
      stopTimer: stopTimer
    };

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
        controller: 'TimeForm as f',
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

    function stopTimer(item){
      TimeResource.stopTimer(item);
      TimeClock.stopClock();
    }
  }

})();