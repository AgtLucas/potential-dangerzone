'use strict';

angular.module('Danger')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/bulls', {
        templateUrl: 'views/bull/bulls.html',
        controller: 'BullController',
        resolve:{
          resolvedBull: ['Bull', function (Bull) {
            return Bull.query();
          }]
        }
      })
    }]);
