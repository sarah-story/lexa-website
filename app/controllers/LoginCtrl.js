define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.LoginCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    });
  }])
  .controller('LoginCtrl', function($scope, $location) {
    var ref = new Firebase("https://lexa.firebaseio.com");

    $scope.login = function() {
      ref.authWithPassword({
        email    : $scope.email,
        password : $scope.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $scope.authData = authData;
          $location.path("#/").replace();
          $scope.$apply();
        }
      });
    };

    $scope.newUser = function() {
      $location.path("/create_account").replace();
    };

  });
});
