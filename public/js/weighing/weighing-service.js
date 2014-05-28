'use strict';

angular.module('Danger')
  .factory('Weighing', ['$resource', function ($resource) {
    return $resource('Danger/weighings/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'},
      'find': { method: 'GET'}
    });
  }]);
