'use strict';

(function(){

  angular
    .module('scrummyApp')
    .factory('Times', TimesService);

  TimesService.$inject = ['Data', 'Resource', 'Async'];

  function TimesService(Data, Resource, Async){

    return {
      updateTimes: updateTimes
    };

    function updateTimes(type, id, text){
      var singleType = $filter('singular')(type);
      return Resource.getAll(Data.times)
        .then(filter)
        .then(update);

      function filter(times){
        var filtered = _.where(times, function (time) {
          return time[singleType].id === id;
        });
        return Async.when(filtered);
      }

      function update(filteredTimes){
        filteredTimes.forEach(function (filteredTime) {
          var urlFragments = Data.timeType(filteredTime.$id, singleType);
          Resource.put(urlFragments, text);
        });
      }
    }
  }
})();