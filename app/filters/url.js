define(['angular'], function(angular) {
  return angular.module('LexaApp.url',[]).filter('url', function($sce) {
    //Use string as url
    return $sce.trustAsResourceUrl;
  });
});