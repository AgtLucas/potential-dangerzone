'use strict';

angular.module('Danger')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/weighings', {
        templateUrl: 'views/weighing/weighings.html',
        controller: 'WeighingController',
        resolve:{
          resolvedWeighing: ['Weighing', function (Weighing) {
            return Weighing.query();
          }]
        }
      })
    }]);
