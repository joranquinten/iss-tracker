(function () {

  'use strict';

  /*
  Service for getting predefined information from the ergast API
  Available from app.core
  */

  angular
    .module('app.core')
    .factory('dataService', dataService);

  /* @ngInject */
  function dataService($http, $q, $log, appConfig) {

    var service = {
      getSatellite: getSatellite,
      getPeopleInSpace: getPeopleInSpace
    };

    return service;

    ////////////////


    /*

    Retrieve the data from satellite API

    Expects: ID of requested satellite
    Returns: promise of an unformated collection from the API

    */

    function getSatellite(id) {

      var deferred = $q.defer();

      // Service function expects an ID, reject if none supplied
      if (!id) {
        deferred.reject('No ID supplied to satellite service!');
      }

      // Make the call and resolve the data or reject on API error
      $http({
        url: appConfig.SATELLITE_API + id,
        cache: false
      }).then(function success(response) {
        deferred.resolve(response);
      }, function error(response) {
        deferred.reject('No valid API call to: ' + response.config.url);
      });

      return deferred.promise;

    }

    /*

    Retrieve the data from open astro API

    Expects: Nothing
    Returns: promise of an unformated collection from the public API

    */

    function getPeopleInSpace() {

      var deferred = $q.defer();

      // Make the call and resolve the data or reject on API error
      $http({
        url: appConfig.PEOPLE_IN_SPACE_API,
        cache: true
      }).then(function success(response) {
        deferred.resolve(response);
      }, function error(response) {
        deferred.reject('No valid API call to: ' + response.config.url);
      });

      return deferred.promise;

    }



  }

})();