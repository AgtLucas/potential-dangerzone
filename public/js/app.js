define(['angularAMD', 'angular-route', 'autocomplete'], function (angularAMD) {
  var app = angular.module("app", ['ngRoute', 'angucomplete']);

  app.factory("SweetAlert", function(){
    var swal = window.swal,
      self = {
        swal: function(arg1,arg2,arg3,arg4,arg5){
          swal(arg1,arg2,arg3,arg4,arg5)
        },
        success: function(title,message,text){
          swal(title,message,"success", text, 0)
        },
        error: function(title,message,text){
          swal(title,message,"error", text, 1)
        },
        warning:function(title,message,text){
          swal(title,message,"warning", text, 0)
        },
        info: function(title,message,text){
          swal(title,message,"info", text, 0)
        }
      };
    return self;
  });

  app.config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when("/home", angularAMD.route({
      templateUrl: '/views/home/' + Math.random(),
      controller: 'home',
      controllerUrl: 'js/home/controller'
    })).when("/meus-dados", angularAMD.route({
      templateUrl: '/views/user/' + Math.random(),
      controller: 'user',
      controllerUrl: 'js/user/controller'
    })).when("/new-boi", angularAMD.route({
      templateUrl: '/views/boi/new/' + Math.random(),
      controller: 'new-boi',
      controllerUrl: 'js/boi/new/controller'
    })).when("/todos-boi", angularAMD.route({
      templateUrl: '/views/boi/' + Math.random(),
      controller: 'todos-boi',
      controllerUrl: 'js/boi/controller'
    })).when("/abatidos-boi", angularAMD.route({
      templateUrl: '/views/boi/abatido/' + Math.random(),
      controller: 'abatidos-boi',
      controllerUrl: 'js/boi/abatido/controller'
    })).when("/new-pesagem", angularAMD.route({
      templateUrl: '/views/pesagem/new/' + Math.random(),
      controller: 'new-pesagem',
      controllerUrl: 'js/pesagem/new/controller'
    })).when("/individual-pesagem", angularAMD.route({
      templateUrl: '/views/pesagem/individual/' + Math.random(),
      controller: 'individual-pesagem',
      controllerUrl: 'js/pesagem/individual/controller'
    })).when("/geral-pesagem", angularAMD.route({
      templateUrl: '/views/pesagem/geral/' + Math.random(),
      controller: 'geral-pesagem',
      controllerUrl: 'js/pesagem/geral/controller'
    })).when("/grafico-boi", angularAMD.route({
      templateUrl: '/views/grafico/boi/' + Math.random(),
      controller: 'grafico-boi',
      controllerUrl: 'js/grafico/boi/controller'
    })).when("/grafico-pesagem", angularAMD.route({
      templateUrl: '/views/grafico/pesagem/' + Math.random(),
      controller: 'grafico-pesagem',
      controllerUrl: 'js/grafico/pesagem/controller'
    })).otherwise({redirectTo: "/home"});

    var httpStatusInterceptor = function($window){
      function success(response){
        if(response.data.error == 1){
          return error(response);
        }
        if(response.data.error == 2){
          return info(response);
        }
        return response;
      }
      function error(response) {
        return window.swal("Ops! Ocorreu algum erro.","","error", "<i class='glyphicon glyphicon-log-out'></i>&nbsp;&nbsp;Fechar", 1);
      }
      function info(response) {
        return window.swal(response.data.message,"","error", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok", 0);
      }
      return function(promise) {
        return promise.then(success, error);
      }
    }
    $httpProvider.responseInterceptors.push(httpStatusInterceptor);
  });

  app.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });
  });



  app.controller("homeCtrl", function($scope, $window){
    $scope.sair = function(){
      $window.location.href = "/logout";
    };
  });

  return angularAMD.bootstrap(app);
});