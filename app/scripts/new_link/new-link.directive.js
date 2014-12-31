'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.directive:newLink
 * @description
 * # NewLink
 * New Link directive
 */
angular.module('linksListingApp')
  .directive('newLink', function () {
    return {
    	restrict: 'E',
        scope: false,
    	templateUrl: 'views/new-link.tpl.html',
    	controller: 'NewLinkCtrl'
    };
  });
