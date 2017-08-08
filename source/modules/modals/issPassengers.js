(function () {

  'use strict';

  /*
  Modal for displaying races per defined season
  Available from app.core
  */

  angular
    .module('app.core')
    .controller('issPassengersModalController', issPassengersModalController);

  /* @ngInject */
  function issPassengersModalController($uibModalInstance, passengers) {

    // Bind this to a viewModel
    var vm = this;

    // passengers get passed when calling the modal from the parent controller
    vm.passengers = passengers;

    vm.close = close;

    ///////////////

    function close () {
      $uibModalInstance.close();
    }


  }

})();
