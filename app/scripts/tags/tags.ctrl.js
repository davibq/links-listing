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

    $scope.addTag = function() {
      $scope.result.push($scope.newHashTag);
      $scope.newHashTag = '';
    };

    $scope.removeTag = function(pIndex) {
      $scope.result.splice(pIndex, 1);
    };

    $scope.getColor = function(pIndex) {
      return $scope.tagColors[pIndex % $scope.tagColors.length];
    };

  });
