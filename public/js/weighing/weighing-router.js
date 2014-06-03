'use strict';

angular.module('Danger').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/NewWeighing', {
      templateUrl: 'views/weighing/newweighing.html',
      controller: 'ctrlNewWeighing',
      resolve:{
        resolvedBull: ['Bull', function (Bull) {
          return Bull.query({status: 1});
        }]
      }
    })
    .when('/ConAll', {
      templateUrl: 'views/weighing/conall.html',
      controller: 'ctrlConAll',
      resolve:{
        resolvedBull: ['Bull', function (Bull) {
          return Bull.query({status: 1});
        }]
      }
    })
    .when('/ConWeighing', {
      templateUrl: 'views/weighing/conweighing.html',
      controller: 'ctrlConWeighing',
      resolve:{
        resolvedBull: ['Bull', function (Bull) {
          return Bull.query();
        }]
      }
    })
}]);
