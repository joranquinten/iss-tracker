(function () {

  'use strict';

  /*
  Register constants to be used throughout the app
  */

  angular
    .module('app.core')
    .constant('appConfig', {
      'APP_NAME': 'ISS Dashboard',
      'DEFAULT_PAGE': 'home',
      'GOOGLE_MAPS_API_KEY': 'AIzaSyCSVvXgVygif_XfWo7UJhjDaWMxAg76n5A',
      'SATELLITE_API': 'https://api.wheretheiss.at/v1/satellites/',
      'PEOPLE_IN_SPACE_API': 'http://api.open-notify.org/astros.json'
    });

})();
