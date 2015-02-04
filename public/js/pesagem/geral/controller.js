define(['js/app'], function (app) {
  app.controller('geral-pesagem', function ($scope, $http, $sce, SweetAlert) {

    angular.extend($scope, {
      bulls: []
    })

    $http.get("/bois").success(function(data){
      angular.extend($scope, {
        bulls: data
      })
    });

    $scope.mergeDate = function(data){
      if(!!data){
        return (data.split("T")[0]).split("-")[2] + "/" + (data.split("T")[0]).split("-")[1] + "/" + (data.split("T")[0]).split("-")[0];
      }else{
        return "";
      }
    };

    $scope.mergeDay = function(data1, data2){
      if(data1 && data2){
        data1 = new Date(data1.split("/")[2] + "-" + data1.split("/")[1] + "-" + data1.split("/")[0]);
        data2 = new Date(data2.split("/")[2] + "-" + data2.split("/")[1] + "-" + data2.split("/")[0]);
        return ((data2 - data1) / (24 * 60 * 60 * 1000));
      }
      return "";
    };

    $scope.evolucao = function(peso1, peso2) {
      if(isNaN((((parseInt(peso2) - parseInt(peso1)) * 100) / parseInt(peso1)).toFixed(0))){
        return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + 0 + "%";
      }
      return (parseInt(peso2) - parseInt(peso1)) + " Kg" + " - " + (((parseInt(peso2) - parseInt(peso1)) *100) / parseInt(peso1)).toFixed(0) + "%";
    };

    $scope.gerarPDF = function() {
      var imgData = 'data:image/jpeg;base64,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';
      var imgData2 = 'data:image/jpeg;base64,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';
      var doc = new jsPDF('landscape');
      doc.setFontSize(30);
      doc.addImage(imgData, 'JPEG', 15, 10, 40, 20);
      doc.addImage(imgData2, 'JPEG', 240, 10, 40, 20);
      doc.text(115, 25, "Rancho Bom");
      $scope.popular(doc);
      doc.save("Relatorio.pdf");
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

    $scope.popular = function(doc){
      doc.setFontSize(11);
      var linha = 45;
      var coluna = [10,30,47,64,90,107,133,150,176,193,219,236,265];
      var _coluna = 0;
      doc.setFontSize(10);
      for(var i = 0; $scope.bulls.length > i; i++){
        doc.text(coluna[_coluna], linha - 5, "Brinco");
        doc.text(coluna[_coluna], linha, ($scope.bulls[i].earring).toString());
        _coluna++;
        for(var o = 0; $scope.bulls[i].Weighings.length > o; o++){
          doc.text(coluna[_coluna], linha - 5, $scope.bulls[i].Weighings[o].createdAt.split("T")[0].split("-")[2] + "/" + $scope.bulls[i].Weighings[o].createdAt.split("T")[0].split("-")[1]);
          doc.text(coluna[_coluna], linha, ($scope.bulls[i].Weighings[o].weight.toFixed(2)).toString());
          if(o > 0){
            _coluna++;
            doc.text(coluna[_coluna], (linha - 5),
              $scope.mergeDay($scope.bulls[i].Weighings[o-1].createdAt, $scope.bulls[i].Weighings[o].createdAt).toString() + " Dias");
            doc.text(coluna[_coluna], linha, $scope.evolucao($scope.bulls[i].Weighings[o-1].weight, $scope.bulls[i].Weighings[o].weight));
          }
          _coluna++;
        }
        doc.setFontType("bold");
        doc.text(coluna[coluna.length - 1], linha - 5, "Total");
        if($scope.bulls[i].Weighings.length > 0){
          doc.text(coluna[coluna.length - 1], linha, $scope.evolucao($scope.bulls[i].Weighings[0].weight, $scope.bulls[i].Weighings[$scope.bulls[i].Weighings.length - 1].weight));
        }else{
          doc.text(coluna[coluna.length - 1], linha, $scope.evolucao(0, 0));
        }
        doc.setFontType("normal");
        if ((i === 10) || (i % 11 === 0 && i !== 0 && i !== 11)) {
          doc.addPage();
          linha = 10;
        }
        linha = linha + 15;
        _coluna = 0;
      };
    };
  });
});