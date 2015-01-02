"use strict";angular.module("linksListingApp",["ngAnimate","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]).run(["$http",function(a){a.defaults.headers.common["X-Parse-Application-Id"]="kQ0Iv7RTOKVaPLGNHM0jq3wH2BVOZsd1Pn9SDG2M",a.defaults.headers.common["X-Parse-REST-API-Key"]="w9PR6DmFcL696UBCofIJXYnS9C3pWbCzD3eBW2l9"}]),angular.module("linksListingApp").controller("MainCtrl",["$scope","$rootScope","LinksService","$window",function(a,b,c,d){a.orderProperty="rating",c.getLinks().success(function(b){b&&b.results&&(a.links=b.results.map(function(a){return a.tags=a.tags.join(" "),a}))}).error(function(a){console.log(a)}),a.goToLink=function(b){a.links[b].visits++,c.updateVisits(a.links[b].objectId,a.links[b].visits),d.open(a.links[b].url,"_blank")},b.$on("linkSaved",function(b,c){a.links.push(c)})}]),angular.module("linksListingApp").factory("LinksService",["$http",function(a){var b={},c="https://api.parse.com/1/classes/Links";return b.getLinks=function(){return a.get(c)},b.saveLink=function(b){return b.visits=0,a.post(c,b)},b.updateVisits=function(b,d){var e={visits:d};return a.put(c+"/"+b,e)},b}]),angular.module("linksListingApp").controller("RatingCtrl",["$scope",function(a){function b(){a.starsObjects=[];for(var b=0;b<a.stars;b++)a.starsObjects.push({status:c})}var c="glyphicon-star-empty",d="glyphicon-star";a.pickStar=function(b){a.result=b+1,a.starsObjects.forEach(function(a,e){a.status=b>=e?d:c})},b()}]),angular.module("linksListingApp").directive("rating",function(){return{restrict:"E",scope:{result:"=",stars:"@"},templateUrl:"views/rating.tpl.html",controller:"RatingCtrl"}}),angular.module("linksListingApp").controller("TagsCtrl",["$scope",function(a){a.tagColors=["#FF0000","#003300","#663300","#660033","#006666"],a.result=[],a.addTag=function(){a.result.push(a.newHashTag),a.newHashTag=""},a.removeTag=function(b){a.result.splice(b,1)},a.getColor=function(b){return a.tagColors[b%a.tagColors.length]}}]),angular.module("linksListingApp").directive("tags",function(){return{restrict:"E",scope:{result:"="},templateUrl:"views/tags.tpl.html",controller:"TagsCtrl"}}),angular.module("linksListingApp").controller("NewLinkCtrl",["$scope","$rootScope","LinksService",function(a,b,c){a.newLink={},a.save=function(){c.saveLink(a.newLink).success(function(){b.$broadcast("linkSaved",a.newLink),a.newLink={}})}}]),angular.module("linksListingApp").directive("newLink",function(){return{restrict:"E",scope:!1,templateUrl:"views/new-link.tpl.html",controller:"NewLinkCtrl"}});