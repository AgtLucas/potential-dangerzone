'use strict';

angular.module('Danger').controller('ctrlWeighingBull', ['$scope', 'resolvedBull', 'Bull', function ($scope, resolvedBull, Bull) {

    $scope.bulls = resolvedBull;
    $scope.meses = [];

    $scope.btn = false;

    $scope.gerarGraficos = function(){
      $scope.merge($scope.bulls);
      $scope.btn = true;
    };

    $scope.merge = function(data){
      var mes = 1,
          atual = {},
          meses = {},
          totais = {};

      for(var i = 0; i < data.length; i++){
        for(var j = 0; j < data[i].weighings.length; j++){
          atual = data[i].weighings[j];
          if(angular.isObject(atual)){
            totais[$scope.mergeDate(atual.updatedAt)] = totais[$scope.mergeDate(atual.updatedAt)] || 0;
            totais[$scope.mergeDate(atual.updatedAt)] = totais[$scope.mergeDate(atual.updatedAt)] + 1;
            meses[$scope.mergeDate(atual.updatedAt)] = meses[$scope.mergeDate(atual.updatedAt)] || 0;
            meses[$scope.mergeDate(atual.updatedAt)] = meses[$scope.mergeDate(atual.updatedAt)] + atual.weight;
          };
        };
      };

      $scope.mergeMeses(totais, meses);

    };

    $scope.mergeMeses = function(total, meses){
      angular.forEach(total, function(value, key) {
       $scope.meses.push({ y: parseInt(meses[key] / value), label: key});
      });
      $scope.chartRow($scope.meses, meses);
    };

    $scope.mergeDate = function(data){
        if(!!data){
          return (data.split("T")[0]).split("-")[1] + (data.split("T")[0]).split("-")[0];
        }else{
          return "";
        }
      }

    $scope.chartRow = function(total){
    var chart = new CanvasJS.Chart("chartRow",
    {
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
      data: [
      {
        toolTipContent: "{label}: {y} Kilos",
        type: "column",
        showInLegend: true,
        legendMarkerColor: "gray",
        legendText: "Peso",
        dataPoints: total
      }
      ]
    });
    chart.render();
  };

    $scope.calcular = function(v, a, q){
      var qtd = v + a;
      if(q == "1"){
        return ((100 * v) / qtd).toFixed(2) || 0 + "%";
      }else{
        return ((100 * a) / qtd).toFixed(2) || 0 + "%";
      }
    };
}]);