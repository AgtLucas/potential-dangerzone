'use strict';

angular.module('Danger')
  .factory('Bull', ['$resource', function ($resource) {
    return $resource('Danger/bulls/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
