define(['js/app', 'jquery', 'jqueryMask'], function (app) {
  app.controller('new-pesagem', function ($scope, $http, $sce, SweetAlert) {

    angular.extend($scope, {
      brinco: "",
      brincos: [],
      peso: "",
      dataPesagem: new Date()
    });

    $("#peso").mask("999.99");

    $scope.getBrincos = function(viewValue){
      if(viewValue != "" && viewValue != undefined){
        if(angular.isObject(viewValue)){
          return viewValue;
        }else{
          return $http.get('/bois-vivos-select/' + viewValue)
          .then(function(res) {
            return res.data;
          });
        }
      }else{
        return [];
      }
    };

    $scope.showButton = function(){
      return (!angular.isObject($scope.brinco)) || (!$("#peso").val() != "");
    };

    $scope.salvar = function(){
      var data = new Date($scope.dataPesagem);
      data.setHours(0);
      $http.post("/new-pesagem", {
        "brinco": $scope.brinco,
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
        dataPesagem: new Date()
      });
    };

  });
});