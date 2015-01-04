'use strict';

/**
 * @ngdoc overview
 * @name linksListingApp
 * @description
 * # linksListingApp
 *
 * Main module of the application.
 */
angular
  .module('linksListingApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($http) {
    /**
     * Common headers used to send the requests to Parse
     */
    $http.defaults.headers.common['X-Parse-Application-Id'] = 'kQ0Iv7RTOKVaPLGNHM0jq3wH2BVOZsd1Pn9SDG2M';
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'w9PR6DmFcL696UBCofIJXYnS9C3pWbCzD3eBW2l9';
  });
