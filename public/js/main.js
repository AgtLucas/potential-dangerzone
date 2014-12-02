require.config({
  baseUrl: "",
  paths: {
    'angular': 'lib/angular/angular.min',
    'angular-route': 'lib/angular-route/angular-route.min',
    'angularAMD': 'lib/angular-amd/angularAMD.min',
    'angular-strap': 'lib/angular-strap/angular-strap.min',
    'angular-sanitize': 'lib/angular-sanitize/angular-sanitize',
    'jsPDFDebug': 'lib/jspdf/jspdf.debug',
    'jsPDF': 'lib/jspdf/jspdf.plugin.cell',
    'jquery': 'lib/jquery/dist/jquery.min',
    'jqueryMask': 'lib/jquery/dist/jquery.mask.min',
    'chart': 'lib/chart/chart'
  },
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-strap': ['angular'],
    'jsPDF': ['jsPDFDebug', 'jquery'],
    'chart': ['jquery']
  },
  deps: ['js/app', 'angular-strap', 'jsPDFDebug', 'jsPDF', 'angular-sanitize', 'jquery', 'jqueryMask', 'chart']
});