'use strict';

angular.module('Danger')
  .config(['$routeProvider', function ($routeProvider) {
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
            return Bull.query();
          }]
        }
      })
    }]);
