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
    }]);
