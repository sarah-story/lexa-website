require.config({
  paths: {
    jquery: '../lib/bower_components/jquery/dist/jquery.min',
    jqueryUi: '../lib/bower_components/jquery-ui/jquery-ui.min',
    angular: '../lib/bower_components/angular/angular',
    ngRoute: '../lib/bower_components/angular-route/angular-route.min',
    angularFilter: '../lib/bower_components/angular-filter/dist/angular-filter.min',
    angularfire: '../lib/bower_components/angularfire/dist/angularfire.min',
    _firebase: '../lib/bower_components/firebase/firebase',
    bootstrap: '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    ace: '../lib/bower_components/ace-builds/src-min-noconflict/ace',
    uiAce: '../lib/bower_components/angular-ui-ace/ui-ace.min',
    marked: '../lib/bower_components/marked/marked.min',
    ngAnimate: '../lib/bower_components/angular-animate/angular-animate.min'
  },
  shim: {
    'angular' : {'exports' : 'angular', deps: ['jquery']},
    'ngRoute': ['angular'],
    'angularFilter': ['angular'],
    'angularfire': ['angular', '_firebase'],
    'bootstrap': {deps:['jquery','jqueryUi']},
    'uiAce': ['angular', 'ace'],
    'ngAnimate': ['angular'],
    '_firebase': {
      exports: 'Firebase'
    }
  },
  priority: [
    "jquery",
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