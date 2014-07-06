'use strict';

angular.module('Danger').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/NewBull', {
      templateUrl: 'views/bull/newbull.html',
      controller: 'ctrlNewBull',
      resolve:{
        resolvedBull: ['Bull', function (Bull) {
          return Bull.query();
        }]
      }
    })
    .when('/ConBull', {
      templateUrl: 'views/bull/conbull.html',
      controller: 'ctrlConBull',
      resolve:{
        resolvedBull: ['Bull', function (Bull) {
          return Bull.query({status: 1});
        }]
      }
    })
    .when('/AbatidosBull', {
      templateUrl: 'views/bull/conabatidos.html',
      controller: 'ctrlAbatidosBull',
      resolve:{
        resolvedBull: ['Bull', function (Bull) {
          return Bull.query({status: 2});
        }]
      }
    })
    .when('/ChartBull', {
      templateUrl: 'views/bull/bulls-charts.html',
      controller: 'ctrlChartsBull',
      resolve:{
        resolvedBull: ['Bull', function (Bull) {
          return Bull.query();
        }]
      }
    })
}]);
