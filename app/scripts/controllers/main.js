'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linksListingApp
 */
angular.module('linksListingApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
