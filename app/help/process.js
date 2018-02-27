'use strict';

angular.module('myApp.process', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/process', {
    templateUrl: 'help/process.html',
    controller: 'processCtrl'
  });
}])

.controller('processCtrl', [ '$scope','$location', function($scope,$location) {

}]);

