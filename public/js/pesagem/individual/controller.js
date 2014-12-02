define(['js/app'], function (app) {
  app.controller('individual-pesagem', function ($scope, $http, $sce, SweetAlert) {

    angular.extend($scope, {
      brinco: "",
      brincos: [],
      bull: { }
    });

    $scope.mergeDay = function(data1, data2){
      data1 = new Date("2014-" + data1.split("/")[1] + "-" +data1.split("/")[0]);
      data2 = new Date("2014-" + data2.split("/")[1] + "-" +data2.split("/")[0]);
      return ((data2 - data1) / (24 * 60 * 60 * 1000));
    };

    $scope.mergeDate = function(data){
      if(!!data){
        return (data.split("T")[0]).split("-")[2] + "/" + (data.split("T")[0]).split("-")[1];
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

    $http.get("/bois-vivos").success(function(data){
      angular.extend($scope, {
        brincos: data
      });
    });

    $scope.pesquisar = function(earring){
      if(angular.isObject(earring)){
        $http.get("/bois/" + earring.id).success(function(data){
          angular.extend($scope, {
            bull: data
          });
        });
      }
    };

    $scope.showBrinco = function(){
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