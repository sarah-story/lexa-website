define(['angular'], function(angular) {
  return angular.module('LexaApp.url',[]).filter('url', function($sce) { 
    return $sce.trustAsResourceUrl;
  });
});