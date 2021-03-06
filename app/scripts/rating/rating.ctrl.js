'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:NewLinkCtrl
 * @description
 * # NewLinkCtrl
 * New Link directive controller
 */

angular.module('linksListingApp')
  .controller('RatingCtrl', function ($scope) {

  	var EMPTY_STAR = 'glyphicon-star-empty',
  		FILLED_STAR = 'glyphicon-star';

    /* Private functions */

    /**
     * Inits the scope
     * @return {null}
     */
  	function init() {
  		// Inits the stars array with the desired number of stars
  		$scope.starsObjects = [];
  		for (var starsToCreate = 0; starsToCreate < $scope.stars; starsToCreate++) {
  			$scope.starsObjects.push({
				status: EMPTY_STAR
			});	
  		}
  	}


    /* Scope functions */

    /**
     * Function triggered when the user pick a star
     * @param  {int} pStarIndex Zero based index of the star selected
     * @return {[type]}            [description]
     */
    $scope.pickStar = function(pStarIndex) {
      $scope.result = pStarIndex + 1;
      $scope.starsObjects.forEach(function(pElement, pIndex) {
        if (pIndex <= pStarIndex) {
          pElement.status = FILLED_STAR;
        } else {
          pElement.status = EMPTY_STAR;
        }
      });
    };

  	init();
  });
