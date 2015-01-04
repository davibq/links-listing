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
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(["$http", function($http) {
    /**
     * Common headers used to send the requests to Parse
     */
    $http.defaults.headers.common['X-Parse-Application-Id'] = 'kQ0Iv7RTOKVaPLGNHM0jq3wH2BVOZsd1Pn9SDG2M';
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'w9PR6DmFcL696UBCofIJXYnS9C3pWbCzD3eBW2l9';
  }]);

'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linksListingApp
 */
angular.module('linksListingApp')
  .controller('MainCtrl', ["$scope", "$rootScope", "LinksService", "$window", function ($scope, $rootScope, LinksService, $window) {
  	
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

  }]);

'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.factory:LinksService
 * @description
 * # LinksService
 * Factory used to interact with the API
 */

angular.module('linksListingApp')
  .factory('LinksService', ["$http", function ($http) {
  	var factoryObject = {},
  		baseURL = 'https://api.parse.com/1/classes/Links';

    /**
     * Get links from the BE
     * @return {Promise} Promise with the http response
     */
    factoryObject.getLinks = function() {
    	 return $http.get(baseURL);
    };

    /**
     * Saves a new link
     * @param  {Object} pObject New link to save
     * @return {Promise}         Promise with the http post of the link
     */
    factoryObject.saveLink = function(pObject) {
    	pObject.visits = 0;
    	return $http.post(baseURL, pObject);
    };

    /**
     * Updates the number of visits in a link
     * @param  {String} pObjectId  Parse id of the object to sabe
     * @param  {int} pNewVisits Number of new visits
     * @return {Promise} Promise with http put result
     */
    factoryObject.updateVisits = function(pObjectId, pNewVisits) {
      var dataToUpdate = {
        visits: pNewVisits
      };
      return $http.put(baseURL + '/' + pObjectId, dataToUpdate);
    };

    return factoryObject;
  }]);

'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:NewLinkCtrl
 * @description
 * # NewLinkCtrl
 * New Link directive controller
 */

angular.module('linksListingApp')
  .controller('RatingCtrl', ["$scope", function ($scope) {

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
  }]);

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

'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:TagsCtrl
 * @description
 * # TagsCtrl
 * Tags directive controller
 */

angular.module('linksListingApp')
  .controller('TagsCtrl', ["$scope", function ($scope) {
    
    $scope.tagColors = ['#FF0000', '#003300', '#663300', '#660033', '#006666'];

    $scope.result = [];

    /**
     * Function triggered when a new tag is added
     */
    $scope.addTag = function() {
      $scope.result.push($scope.newHashTag);
      $scope.newHashTag = '';
    };

    /**
     * Function triggered when clicked on a tag. It removes a tag
     * @param  {int} pIndex Index of the tag to remove
     * @return {null}
     */
    $scope.removeTag = function(pIndex) {
      $scope.result.splice(pIndex, 1);
    };

    /**
     * Gets the color of the tag based on the index and the available array of colors
     * @param  {int} pIndex Index of the tag
     * @return {String} String with the hex color used for style the tag
     */
    $scope.getColor = function(pIndex) {
      return $scope.tagColors[pIndex % $scope.tagColors.length];
    };

  }]);

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

'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:NewLinkCtrl
 * @description
 * # NewLinkCtrl
 * New Link directive controller
 */

angular.module('linksListingApp')
  .controller('NewLinkCtrl', ["$scope", "$rootScope", "LinksService", function ($scope, $rootScope, LinksService) {
  	$scope.newLink = {};
    $scope.newLink.rating = 1;

    /**
     * Saves a new link
     * @return {null}
     */
  	$scope.save = function() {
  		LinksService.saveLink($scope.newLink)
  			.success(function() {
  				$rootScope.$broadcast('linkSaved', $scope.newLink);
  				$scope.newLink = {};
          $scope.newLink.tags = [];
          $scope.newLink.rating = 1;
  			});
  	};
  }]);

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
