'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:NewLinkCtrl
 * @description
 * # NewLinkCtrl
 * New Link directive controller
 */

angular.module('linksListingApp')
  .controller('NewLinkCtrl', function ($scope, $rootScope, LinksService) {
  	$scope.newLink = {};
  	$scope.save = function() {
  		LinksService.saveLink($scope.newLink)
  			.success(function() {
  				$rootScope.$broadcast('linkSaved', $scope.newLink);
  			});
  	};
  });
