define(['js/app'], function (app) {
  app.controller('new-boi', function ($scope, $http, SweetAlert) {

    angular.extend($scope, {
      brinco: "",
      nascimento: new Date()
    });

    $scope.salvar = function(){
      $http.post("/new-boi", {
        "brinco": $scope.brinco,
        "nascimento": $scope.nascimento
      }).success(function(data){
        SweetAlert.success(data.message, "", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok");
        $scope.clear();
      });
    };

    $scope.nascimentoBanco = function(data){
      data = new Date(data);
      return (data.getFullYear() + "-" + data.getDate() + "-" + (data.getMonth() + 1));
    };

    $scope.clear = function(){
      angular.extend($scope, {
        brinco: "",
        nascimento: new Date()
      });
    };

  });
});