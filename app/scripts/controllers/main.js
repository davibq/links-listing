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

	$scope.goToLink = function(pObjectIndex) {
		$scope.links[pObjectIndex].visits++;
		LinksService.updateVisits($scope.links[pObjectIndex].objectId, $scope.links[pObjectIndex].visits);
		$window.open($scope.links[pObjectIndex].url, '_blank');
	};

	$rootScope.$on("linkSaved", function (event, pLinkSaved) {
		$scope.links.push(pLinkSaved);
	});

  });
