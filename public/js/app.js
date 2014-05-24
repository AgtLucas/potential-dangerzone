angular.module('Danger', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date'])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
    when('/Home', {
      templateUrl: 'views/home/home.html',
      controller: 'ctrlHome'
    }).
    when('/NewBull', {
      templateUrl: 'views/bull/newbull.html',
      controller: 'ctrlNewBull'
    }).
    when('/NewWeighing', {
      templateUrl: 'templates/newweighing.html',
      controller: 'ctrlNewWeighing'
    }).      
    when('/ConBull', {
      templateUrl: 'views/bull/conbull.html',
      controller: 'ctrlConBull'
    }).      
    when('/ConAll', {
      templateUrl: 'templates/conall.html',
      controller: 'ctrlConAll'
    }).  
    when('/ConWeighing', {
      templateUrl: 'templates/conweighing.html',
      controller: 'ctrlConWeighing'
    }).      
    otherwise({
      redirectTo: '/Home'
	});
}]);
