define(['angular'], function(angular) {
  return angular.module('LexaApp.unsafe',[])
  .filter('unsafe', function($sce) {
    //Display strings as HTML 
    return $sce.trustAsHtml; 
  });
});