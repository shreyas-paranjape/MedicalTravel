/*global angular:false */
angular.module('facility', [
    'ui.router'
  ])
  .config(function($stateProvider) {
    'use strict';
    $stateProvider
      .state('facility', {
        url: '/facility',
        templateUrl: 'module/facility/view/home.html',
        controller: 'FacilityController'
      })
  });
