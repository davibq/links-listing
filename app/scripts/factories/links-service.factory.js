'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.factory:LinksService
 * @description
 * # LinksService
 * Factory used to interact with the API
 */

angular.module('linksListingApp')
  .factory('LinksService', function ($http) {
  	var factoryObject = {},
  		baseURL = 'https://api.parse.com/1/classes/Links';

    factoryObject.getLinks = function() {
    	 return $http.get(baseURL);
    };

    factoryObject.saveLink = function(pObject) {
    	pObject.visits = 0;
    	return $http.post(baseURL, pObject);
    };

    factoryObject.updateVisits = function(pObjectId, pNewVisits) {
      var dataToUpdate = {
        visits: pNewVisits
      };
      return $http.put(baseURL + '/' + pObjectId, dataToUpdate);
    };

    return factoryObject;
  });
