'use strict';

(function () {

  angular
    .module('scrummyApp')
    .factory('Data', DataService);

  DataService.$inject = ['$q', '$filter', 'Resource'];

  function DataService($q, $filter, Resource) {

    return {
      add: add,
      createUser: createUser,
      getData: getData,
      getUser: getUser,
      nest: nest,
      remove: remove,
      saveNewTypes: saveNewTypes,
      savePreferences: savePreferences,
      saveTime: saveTime,
      update: update,
      watch: watch
    };

    function add(item, user, type) {
      return Resource.data(user.userName, type).$push(item);
    }

    function createUser(authUser) {
      var user = $filter('userFromAuthUser')(authUser);
      return Resource.data(user.userName, 'user').$set(user);
    }

    function getData(user, type) {
      return Resource.data(user.userName, type).$asArray().$loaded();
    }

    function getUser(authUser) {
      var userName = $filter('userName')(authUser.email);
      return Resource.data(userName, 'user').$asObject().$loaded();
    }

    function nest(seq, keys) {
      if (!keys.length) {
        return seq;
      }
      var first = keys[0];
      var rest = keys.slice(1);
      return _.mapValues(_.groupBy(seq, first), function (value) {
        return nest(value, rest);
      });
    }

    function remove(item, viewData) {
      viewData.items.$remove(item);
    }

    function saveNewTypes(userName, timeEntry) {
      var deferred = $q.defer();
      $q.all(promisesToSave()).then(function (results) {
        deferred.resolve(map(results));
      });
      return deferred.promise;

      function map(results) {
        return {
          client: results[0],
          project: results[1],
          task: results [2]
        };
      }

      function promisesToSave() {
        var promises = [];
        ['client', 'project', 'task'].forEach(function (type) {
          promises.push(promiseToSave(type));
        });
        return promises;

        function promiseToSave(type) {
          var deferred = $q.defer();
          if (isNewType()) {
            resolveNewType();
          } else {
            resolveExistingType();
          }
          return deferred.promise;

          function isNewType() {
            return timeEntry[type].id === '';
          }

          function resolveExistingType() {
            deferred.resolve(timeEntry[type]);
          }

          function resolveNewType() {
            var location = $filter('plural')(type);
            var text = timeEntry[type].text;
            Resource.data(userName, location).$push({name: text}).then(function (ref) {
              deferred.resolve({
                id: ref.name(),
                text: text
              });
            });
          }
        }
      }
    }

    function savePreferences(prefs, userName, type) {
      Resource.preferences(userName, type).$set(prefs);
    }

    function saveTime(userName, timeEntry) {
      return Resource.data(userName, 'times').$push(timeEntry);
    }

    function update(item, viewData) {
      return viewData.items.$save(item).then(updateRelated);

      function updateRelated() {
        var userName = viewData.user.userName;
        var type = $filter('singular')(viewData.type);
        updatePreferences();
        updateTimes();

        function updatePreferences() {
          var location = 'timeEntry/' + type;
          Resource.preferences(userName, location).$update({text: item.name});
        }

        function updateTimes() {
          getData(viewData.user, 'times').then(function (times) {
            var relatedTimes = filter(times);
            relatedTimes.forEach(function (relatedTime) {
              Resource.time(urlParts(relatedTime)).$update({text: item.name});
            });
          });

          function filter(times) {
            return _.where(times, function (time) {
              return time[type].id === item.$id;
            });
          }

          function urlParts(relatedTime) {
            return {
              userName: userName,
              type: type,
              timeId: relatedTime.$id
            };
          }
        }
      }
    }

    function watch(data, callback) {
      data.$watch(function () {
        callback();
      });
    }
  }

})();