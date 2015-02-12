require.config({
  baseUrl: "",
  paths: {
    'angular': 'lib/angular/angular.min',
    'angular-route': 'lib/angular-route/angular-route.min',
    'angularAMD': 'lib/angular-amd/angularAMD.min',
    'jsPDFDebug': 'lib/jspdf/jspdf.debug',
    'jsPDF': 'lib/jspdf/jspdf.plugin.cell',
    'jquery': 'lib/jquery/dist/jquery.min',
    'jqueryMask': 'lib/jquery/dist/jquery.mask.min',
    'chart': 'lib/chart/chart',
    'autocomplete': 'lib/autocomplete/js/angucomplete'
  },
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'autocomplete': ['angular'],
    'jsPDF': ['jsPDFDebug', 'jquery'],
    'chart': ['jquery']
  },
  deps: ['js/app', 'jsPDFDebug', 'jsPDF', 'jquery', 'jqueryMask', 'chart']
});