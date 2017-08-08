(function () {

  'use strict';

  /*
  Define the controller for the module
  */

  angular
    .module('app.home')
    .controller('home', home);

  /* @ngInject */
  function home($log, $q, $uibModal, $interval, uiGmapGoogleMapApi, dataService) {

    var _satellite;

    // Bind this to a viewModel
    var vm = this;

    vm.showDetails = showDetails;

    init();

    ///////////////

    function init() {

      // Start controller by getting the map and setting the position:

      uiGmapGoogleMapApi
        .then(function (maps) {
          $log.debug('Map API ready');

          _getSatelliteLocation(25544)
            .then(function (center) {
              _updateMapCenter(center);
              _updateMarkerPosition(center);
            });

          $interval(
            function () {
              _getSatelliteLocation(25544)
                .then(function (center) {
                  _updateMapCenter(center);
                  _updateMarkerPosition(center);
                });
            }, 2000); // repeat every ms

          vm.map = {
            center: {
              latitude: 0,
              longitude: 0
            },
            zoom: 5,
            options: {
              draggable: false,
              mapTypeControl: false,
              streetViewControl: false,
              MapTypeId: google.maps.MapTypeId.HYBRID,
              zoomControl: true,
              zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
              }
            }
          };
          vm.marker = {
            markerId: 'uidIISKey',
            center: {
              latitude: 0,
              longitude: 0
            },
            options: {
              icon: 'images/map-marker-128.png',
              draggable: false,
              opacity: 0.8
            }
          };

        });
    }

    function _updateMapCenter(center) {
      if (vm.map) {
        vm.map.center = center;
      }
    }

    function _updateMarkerPosition(center) {
      if (vm.marker) {
        vm.marker.center = center;
      }
    }

    /*

    Get satellite location for the ISS

    Expects: ID
    Returns: coordinates of the requested satellite

    */

    function _getSatelliteLocation(id) {

      return _getSatellite(id).then(function (satellite) {

        return {
          latitude: satellite.latitude,
          longitude: satellite.longitude
        };

      });


    }

    /*

    Get satellite data requested satellite

    Expects: id
    Returns: formatted collection

    */

    function _getSatellite(id) {

      $log.debug('Getting satellite data for id:', id);

      var defer = $q.defer();

      // Make the call to the service:
      dataService.getSatellite(id).then(function (response) {

        // Bind the beautified data to the viewModel:
        var satellite = response.data;
        vm.satellite = satellite;
        defer.resolve(satellite);

      }, function error(msg) {

        // Log any error from the service
        defer.reject(msg);

      });

      return defer.promise;

    }

    /*

    Get passenger data the ISS

    Expects: nothing
    Returns: formatted collection

    */

    function _getPassengers() {

      $log.debug('Getting list of people in space.');

      var defer = $q.defer();

      // Make the call to the service:
      dataService.getPeopleInSpace().then(function (response) {

        // Filter for only ISS passengers:
        response.data.people = response.data.people.filter(function(person){
          return (person.craft === 'ISS');
        });

        // Bind the beautified data to the viewModel:
        defer.resolve(response.data.people);

      }, function error(msg) {

        // Log any error from the service
        defer.reject(msg);

      });

      return defer.promise;

    }

    function showDetails() {

      // Open the modal
      $uibModal.open({
        animation: true,
        templateUrl: '/modules/modals/issPassengers.html',
        controller: 'issPassengersModalController',
        controllerAs: 'vm',
        windowTopClass: 'docked',
        size: 'sm',
        resolve: {
          passengers: function () {
            return _getPassengers();
          },
          iss: function() {
            return _satellite;
          }

        }
      });
    }


  }

})();