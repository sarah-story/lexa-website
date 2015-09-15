define(['angular', 'ngRoute', '_firebase', 'angularfire'], function(angular, ngRoute, _firebase, angularfire) {
  return angular.module('LexaApp.Auth', ['ngRoute', 'firebase'])
  .factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://lexa.firebaseio.com");
    return $firebaseAuth(ref);
  }]);
});