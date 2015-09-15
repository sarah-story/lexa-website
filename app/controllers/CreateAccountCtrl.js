define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.CreateAccountCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create_account', {
      templateUrl: 'partials/create_account.html',
      controller: 'CreateAccountCtrl'
    });
  }])
  .controller('CreateAccountCtrl', function($scope, $location) {
    var ref = new Firebase("https://lexa.firebaseio.com");

    $scope.create = function() {
      ref.createUser({
        email    : $scope.email,
        password : $scope.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          ref.child('users').child(userData.uid).set({
            'name': $scope.name,
            'email': $scope.email
          });
          ref.authWithPassword({
            email    : $scope.email,
            password : $scope.password
          }, function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
            } else {
              $scope.authData = authData;
              $location.path("#/").replace();
              $scope.$apply();
            }
          });
        }
      });
    };
  });
});