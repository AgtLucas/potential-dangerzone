define(['js/app', 'chart'], function (app, chart) {
  app.controller('grafico-pesagem', function ($scope, $http, $sce, SweetAlert) {

    angular.extend($scope, {
      meses: []
    });

    $http.get("/bois-geral").success(function(data){
      $scope.merge(data);
    });

    $scope.merge = function(data){
      var mes = 1,
          atual = {},
          meses = {},
          totais = {};
      for(var i = 0; i < data.length; i++){
        for(var j = 0; j < data[i].Weighings.length; j++){
          atual = data[i].Weighings[j];
          if(angular.isObject(atual)){
            totais[$scope.mergeDate(atual.createdAt)] = totais[$scope.mergeDate(atual.createdAt)] || 0;
            totais[$scope.mergeDate(atual.createdAt)] = totais[$scope.mergeDate(atual.createdAt)] + 1;
            meses[$scope.mergeDate(atual.createdAt)] = meses[$scope.mergeDate(atual.createdAt)] || 0;
            meses[$scope.mergeDate(atual.createdAt)] = meses[$scope.mergeDate(atual.createdAt)] + atual.weight;
          };
        };
      };
      $scope.mergeMeses(totais, meses);
    };

    $scope.mergeMeses = function(total, meses){
      angular.forEach(total, function(value, key) {
       $scope.meses.push({ y: parseInt(meses[key] / value), w: value, label: $scope.getValue(key)});
      });
      $scope.chartRow($scope.meses, meses);
    };

    $scope.getValue = function(value){
      return value.substring(0, 2) + "/" + value.substring(2, 6);
    };

    $scope.mergeDate = function(data){
      if(!!data){
        return (data.split("T")[0]).split("-")[1] + (data.split("T")[0]).split("-")[0];
      }else{
        return "";
      }
    };

    $scope.chartRow = function(total){
      var chart = new CanvasJS.Chart("chartRow", {
        title:{
          text: ""
        },
        axisY: {
          title: ""
        },
        legend: {
          verticalAlign: "bottom",
          horizontalAlign: "center"
        },
        theme: "theme2",
        data: [{
          toolTipContent: "{label}: {y} Kilos - {w} Pesagens",
          type: "column",
          showInLegend: true,
          legendMarkerColor: "gray",
          legendText: "Peso",
          dataPoints: total
        }]
      });
      chart.render();
    };

  });
});