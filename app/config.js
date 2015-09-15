require.config({
  paths: {
    angular: '../lib/bower_components/angular/angular',
    ngRoute: '../lib/bower_components/angular-route/angular-route.min',
    angularFilter: '../lib/bower_components/angular-filter/dist/angular-filter.min',
    angularfire: '../lib/bower_components/angularfire/dist/angularfire.min',
    _firebase: '../lib/bower_components/firebase/firebase',
    bootstrap: '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    jquery: '../lib/bower_components/jquery/dist/jquery.min'
  },
  shim: {
    'angular' : {'exports' : 'angular'},
    'ngRoute': ['angular'],
    'angularFilter': ['angular'],
    'angularfire': ['angular', '_firebase'],
    'bootstrap': ['jquery'],
    '_firebase': {
      exports: 'Firebase'
    }
  },
  priority: [
    "angular"
  ]
});

require([
  'angular',
  'app'
  ], function(angular, app) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function() {
      // bootstrap the app manually
      angular.bootstrap(document, ['LexaApp']);
    });
  }
);