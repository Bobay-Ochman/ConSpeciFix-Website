'use strict';

angular.module('myApp.usage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usage', {
    templateUrl: 'help/usage.html',
    controller: 'usageCtrl'
  });
}])

.controller('usageCtrl', [ '$scope','$location', function($scope,$location) {

}]);

