angular.element(document).ready(function() {
  'use strict';
  angular
    .module('medicalTravel', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'ngSanitize',
      'ngTouch',
      'ui.grid',
      'schemaForm',
      'facility'
    ])
    .config(function($urlRouterProvider) {
      $urlRouterProvider.otherwise('/facility');
    });
  angular.bootstrap(document, ['medicalTravel']);
});
