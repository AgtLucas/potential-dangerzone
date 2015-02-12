define(['js/app', 'jquery', 'jqueryMask'], function (app) {
  app.controller('new-pesagem', function ($scope, $http, SweetAlert) {

    var d = new Date();

    angular.extend($scope, {
      brinco: "",
      brincos: [],
      peso: "",
      dataPesagemDia: d.getDate(),
      dataPesagemMes: d.getMonth() + 1,
      dataPesagemAno: d.getFullYear()
    });

    $("#peso").mask("999.99");

    $scope.showButton = function(){
      return (!angular.isObject($scope.brinco)) || (!$("#peso").val() != "");
    };

    $scope.salvar = function(){
      var data = new Date($scope.dataPesagemAno + "-" + $scope.dataPesagemMes + "-" + $scope.dataPesagemDia);
      data.setHours(0);
      $http.post("/new-pesagem", {
        "brinco": $scope.brinco.originalObject,
        "peso": $("#peso").val(),
        "dataPesagem": data
      }).success(function(data){
        SweetAlert.success(data.message, "", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok");
        $scope.clear();
      });
    };

    $scope.clear = function () {
      angular.extend($scope, {
        brinco: "",
        peso: "",
        dataPesagemDia: d.getDate(),
        dataPesagemMes: d.getMonth() + 1,
        dataPesagemAno: d.getFullYear()
      });
    };

  });
});