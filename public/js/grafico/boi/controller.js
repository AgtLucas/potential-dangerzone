define(['js/app', 'chart'], function (app, chart) {
  app.controller('grafico-boi', function ($scope, $http, $sce, SweetAlert) {

    $http.get("/bois-simples").success(function(data){
      $scope.merge(data);
    });

    $scope.merge = function(data){
      var vivos = 0,
          abatidos = 0;
      for(var i = 0; i < data.length; i++){
        if(data[i].status == 1){
          vivos = vivos + 1;
        }else{
          abatidos = abatidos + 1;
        }
      };
      $scope.chartRow(vivos, abatidos);
      $scope.chartPie(vivos, abatidos);
    };

    $scope.chartPie = function(vivos, abatidos){
      var chart = new CanvasJS.Chart("chartPie", {
        title:{
          text: "",
          fontFamily: "arial black"
        },
        legend: {
          verticalAlign: "bottom",
          horizontalAlign: "center"
        },
        toolTip:{
          enabled: true
        },
        theme: "theme1",
        data: [
        {
          type: "pie",
          indexLabelFontFamily: "Garamond",
          indexLabelFontSize: 20,
          indexLabelFontWeight: "bold",
          startAngle:0,
          indexLabelFontColor: "MistyRose",
          indexLabelLineColor: "darkgrey",
          indexLabelPlacement: "inside",
          toolTipContent: "{name}: {y} Bois",
          showInLegend: true,
          dataPoints: [
          {  y: vivos, indexLabel: $scope.calcular(vivos, abatidos, 1) , name: "Vivos", legendMarkerType: "square"},
          {  y: abatidos, indexLabel: $scope.calcular(vivos, abatidos, 2), name: "Abatidos", legendMarkerType: "square"}

          ]
        }]
      });
      chart.render();
    };

    $scope.chartRow = function(vivos, abatidos){
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
          type: "column",
          showInLegend: true,
          legendMarkerColor: "gray",
          legendText: "Quantidade de bois",
          dataPoints: [
            {y: parseInt(vivos), label: "Vivos"},
            {y: parseInt(abatidos),  label: "Abatidos" }
          ]
        }]
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

  });
});