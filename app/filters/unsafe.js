define(['angular'], function(angular) {
  return angular.module('LexaApp.unsafe',[])
  .filter('unsafe', function($sce) { 
    return $sce.trustAsHtml; 
  });
});