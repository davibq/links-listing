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
  });
