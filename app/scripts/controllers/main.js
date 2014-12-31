'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linksListingApp
 */
angular.module('linksListingApp')
  .controller('MainCtrl', function ($scope, $rootScope, LinksService) {
    LinksService.getLinks()
	    .success(function(pData) {
	    	if (pData && pData.results) {
	    		$scope.links = pData.results;
	    	}
	    })
	    .error(function(pError) {
	    	console.log(pError);
	    });

	$rootScope.$on("linkSaved", function (event, pLinkSaved) {
		$scope.links.push(pLinkSaved);
	});

  });
