define(['js/app'], function (app) {
  app.controller('abatidos-boi', function ($scope, $http, SweetAlert) {

    angular.extend($scope, {
      bulls: []
    });

    $http.get("/bois-abatidos").success(function(data){
      angular.extend($scope, {
        bulls: data
      });
    });

    $scope.nascimento = function(data){
      return (data.split("-")[2] + "/" + data.split("-")[1] + "/" + data.split("-")[0]);
    };

    $scope.evolucao = function(peso1, peso2) {
      if(isNaN((((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0))){
        return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + 0 + "%";
      }
      return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + (((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0) + "%";
    };

    $scope.mergeDay = function(data1, data2){
      if(data1 && data2){
        data1 = new Date(data1.split("/")[2] + "-" + data1.split("/")[1] + "-" + data1.split("/")[0]);
        data2 = new Date(data2.split("/")[2] + "-" + data2.split("/")[1] + "-" + data2.split("/")[0]);
        return ((data1 - data2) / (24 * 60 * 60 * 1000));
      }
      return "";
    };

    $scope.mergeDate = function(data){
      if(!!data){
        return (data.split("T")[0]).split("-")[2] + "/" + (data.split("T")[0]).split("-")[1];
      }else{
        return "";
      }
    }

    $scope.reviverBoi = function(obj){
      $http.put("/reviver/" + obj.id).success(function(data){
        for(var i = 0; i < $scope.bulls.length; i++){
          if($scope.bulls[i].id == obj.id){
            $scope.bulls[i].status = 1;
            SweetAlert.success(data.message, "", "<i class='glyphicon glyphicon-ok'></i>&nbsp;&nbsp;Ok");
          }
        };
      });
    };

  });
});