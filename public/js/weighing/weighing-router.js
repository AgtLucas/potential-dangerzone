'use strict';

angular.module('Danger')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/NewWeighing', {
        templateUrl: 'views/weighing/newweighing.html',
        controller: 'ctrlNewWeighing',
        resolve:{
          resolvedWeighing: ['Weighing', function (Weighing) {
            return Weighing.query();
          }]
        }
      })
      .when('/ConAll', {
        templateUrl: 'views/weighing/conall.html',
        controller: 'ctrlConAll',
        resolve:{
          resolvedWeighing: ['Weighing', function (Weighing) {
            return Weighing.query();
          }]
        }
      })
    }]);
