'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linksListingApp
 */
angular.module('linksListingApp')
  .controller('MainCtrl', function ($scope, $rootScope, LinksService, $window) {
  	
  	$scope.orderProperty = 'rating';

  	/*
  		Get links from the Service
  	 */
    LinksService.getLinks()
	    .success(function(pData) {
	    	if (pData && pData.results) {
	    		$scope.links = pData.results.map(function(pElement) {
	    			pElement.tags = pElement.tags.join(' ');
	    			return pElement;
	    		});
	    	}
	    })
	    .error(function(pError) {
	    	console.log(pError);
	    });

	/**
	 * Function called when clicked on a link
	 * @param  {Object} pLink Link to update
	 * @return {null}
	 */
	$scope.goToLink = function(pLink) {
		pLink.visits++;
		LinksService.updateVisits(pLink.objectId, pLink.visits);
		$window.open(pLink.url, '_blank');
	};

	$rootScope.$on('linkSaved', function (event, pLinkSaved) {
		pLinkSaved.tags = pLinkSaved.tags.join(' ');
		$scope.links.push(pLinkSaved);
	});

  });
