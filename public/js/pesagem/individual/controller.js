define(['js/app'], function (app) {
  app.controller('individual-pesagem', function ($scope, $http, $sce, SweetAlert) {

    angular.extend($scope, {
      brinco: "",
      table: false,
      bull: { }
    });

    $scope.mergeDay = function(data1, data2){
      if(data1 && data2){
        data1 = new Date(data1.split("/")[2] + "-" + data1.split("/")[1] + "-" + data1.split("/")[0]);
        data2 = new Date(data2.split("/")[2] + "-" + data2.split("/")[1] + "-" + data2.split("/")[0]);
        return ((data2 - data1) / (24 * 60 * 60 * 1000));
      }
      return "";
    };

    $scope.mergeDate = function(data){
      if(!!data){
        return (data.split("T")[0]).split("-")[2] + "/" + (data.split("T")[0]).split("-")[1] + "/" + (data.split("T")[0]).split("-")[0];
      }else{
        return "";
      }
    }

    $scope.mergeDateComplete = function(data){
      if(!!data){
        return (data.split("T")[0]).split("-")[2] + "/" + (data.split("T")[0]).split("-")[1] + "/" + (data.split("T")[0]).split("-")[0];
      }else{
        return "";
      }
    };

    $scope.evolucao = function(peso1, peso2) {
      if(isNaN((((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0))){
        return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + 0 + "%";
      }
      return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + (((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0) + "%";
    };

    $scope.pesquisar = function(earring){
      if(angular.isObject(earring)){
        $http.get("/bois/" + earring.id).success(function(data){
          angular.extend($scope, {
            table: true,
            bull: data
          });
        });
      }
    };

    $scope.getKilosPorDia = function(peso1, peso2, dias) {
      if(peso1 == 0){
        return '';
      }
      if(peso2 == 0){
        return '';
      }
      if(peso1 == peso2){
        return '';
      }
      return ((peso2 - peso1) / dias).toFixed(3);
    };

    $scope.showBrinco = function(){
      if(!angular.isObject($scope.brinco)){
        angular.extend($scope, {
          table: false
        });
      }
      return angular.isObject($scope.brinco);
    };

    $scope.excluir = function(obj){
      $http.delete("/pesagem/" + obj.id).success(function(data){
        SweetAlert.success(data.message, "", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok");
        obj.id = obj.BullId;
        $scope.pesquisar(obj);
      });
    };

  });
});