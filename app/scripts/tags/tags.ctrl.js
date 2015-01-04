'use strict';

/**
 * @ngdoc function
 * @name linksListingApp.controller:TagsCtrl
 * @description
 * # TagsCtrl
 * Tags directive controller
 */

angular.module('linksListingApp')
  .controller('TagsCtrl', function ($scope) {
    
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

  });
