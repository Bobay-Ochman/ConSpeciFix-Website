'use strict';

angular.module('myApp.results', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'help/results.html',
    controller: 'resultsCtrl'
  });
}])

.controller('resultsCtrl', [ '$scope','$location', function($scope,$location) {

}]);

