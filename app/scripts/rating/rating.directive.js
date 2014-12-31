'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.directive:rating
 * @description
 * # Rating
 * Rating directive
 */
angular.module('linksListingApp')
  .directive('rating', function () {
    return {
    	restrict: 'E',
    	scope: {
    		result: '=',
    		stars: '@'
    	},
    	templateUrl: 'views/rating.tpl.html',
    	controller: 'RatingCtrl'
    };
  });
