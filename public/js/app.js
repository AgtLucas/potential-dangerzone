angular.module('Danger', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date', 'ui.select2'])
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
      templateUrl: 'views/weighing/newweighing.html',
      controller: 'ctrlNewWeighing'
    }).
    when('/ConBull', {
      templateUrl: 'views/bull/conbull.html',
      controller: 'ctrlConBull'
    }).
    when('/ConAll', {
      templateUrl: 'views/weighing/conall.html',
      controller: 'ctrlConAll'
    }).
    when('/ConWeighing', {
      templateUrl: 'views/weighing/conweighing.html',
      controller: 'ctrlConWeighing'
    }).
    when('/AbatidosBull', {
      templateUrl: 'views/bull/conabatidos.html',
      controller: 'ctrlAbatidosBull'
    }).
    when('/ChartBull', {
      templateUrl: 'views/bull/bulls-charts.html',
      controller: 'ctrlChartsBull'
    }).
    otherwise({
      redirectTo: '/Home'
	});
}]);
