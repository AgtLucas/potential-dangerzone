'use strict';

angular.module('Danger').factory('Bull', ['$resource', function ($resource) {
  return $resource('Danger/bulls/:earring', {}, {
    'query': { method: 'GET', isArray: true},
    'get': { method: 'GET'},
    'update': { method: 'PUT'},
    'create': { method: 'POST'},
    'find': { method: 'GET', isArray: true}
  });
}]);
