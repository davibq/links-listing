'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.directive:rating
 * @description
 * # Rating
 * Rating directive
 */
angular.module('linksListingApp')
  .directive('tags', function () {
    return {
    	restrict: 'E',
    	scope: {
    		result: '='
    	},
    	templateUrl: 'views/tags.tpl.html',
    	controller: 'TagsCtrl'
    };
  });
