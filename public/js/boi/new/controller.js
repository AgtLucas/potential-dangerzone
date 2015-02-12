define(['js/app'], function (app) {
  app.controller('new-boi', function ($scope, $http, SweetAlert) {

    var d = new Date();

    angular.extend($scope, {
      brinco: "",
      nascimentoDia: d.getDate(),
      nascimentoMes: d.getMonth() + 1,
      nascimentoAno: d.getFullYear()
    });

    $scope.salvar = function(){
      var dataNascimento = new Date($scope.nascimentoAno + "-" + $scope.nascimentoMes + "-" + $scope.nascimentoDia);
      $http.post("/new-boi", {
        "brinco": $scope.brinco,
        "nascimento": dataNascimento
      }).success(function(data){
        SweetAlert.success(data.message, "", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok");
        $scope.clear();
      });
    };

    $scope.clear = function(){
      angular.extend($scope, {
        brinco: "",
        nascimentoDia: d.getDate(),
        nascimentoMes: d.getMonth() + 1,
        nascimentoAno: d.getFullYear()
      });
    };

  });
});