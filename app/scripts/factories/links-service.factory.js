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
  });
