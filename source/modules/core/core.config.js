(function () {

  'use strict';

  /*
  Define the app default configuration
  */

  angular
    .module('app.core')
    .config(setConfiguration);

  /* @ngInject */
  function setConfiguration($urlRouterProvider, uiGmapGoogleMapApiProvider, appConfig) {

    setRoutingConfig();
    setMapConfig();

    ////////////////

    /*

    Set the default state to the configured default state

    */

    function setRoutingConfig() {
      $urlRouterProvider.otherwise(appConfig.DEFAULT_PAGE);
    }

    function setMapConfig() {
      uiGmapGoogleMapApiProvider.configure({
        key: appConfig.GOOGLE_MAPS_API_KEY,
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
      });
    }

  }

})();